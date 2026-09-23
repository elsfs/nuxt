<!--
  网络请求异常提示弹窗
  与 xjx-onehip-frontend/app/onehip-main/src/layout/components/errorMessage/index.vue 展示保持一致：
  标题/图标按响应 code 区分，支持展开请求详情（接口、方法、参数、响应、状态）。
-->
<script lang="ts" setup>
import type { Component } from 'vue';

import { markRaw, ref, watch } from 'vue';

import {
  CircleCloseFilled,
  SuccessFilled,
  Warning,
  WarningFilled,
} from '@element-plus/icons-vue';
import {
  ElButton,
  ElDialog,
  ElIcon,
  ElScrollbar,
} from 'element-plus';
// 显式引入组件样式：@element-plus/nuxt 只为「模板自动导入」的组件注入样式，
// 显式 import 的组件不会自动带样式（与 app/adapter/component/index.ts 的做法一致）。
import 'element-plus/es/components/dialog/style/css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/icon/style/css';
import 'element-plus/es/components/scrollbar/style/css';

import { useErrorStore } from '~/store/error';

defineOptions({ name: 'ErrorMessage' });

interface ErrorDialogItem {
  callback?: (data: any) => void;
  color: string;
  icon: Component;
  id: number;
  info: {
    code: number | string | undefined;
    data: any;
    method: string | undefined;
    res: any;
    url: string | undefined;
  };
  message: string;
  /** 是否已执行关闭回调，避免 @close 与确定按钮重复触发 */
  settled: boolean;
  showInfo: boolean;
  title: string;
  visible: boolean;
}

const errorStore = useErrorStore();

const errorLists = ref<ErrorDialogItem[]>([]);

watch(
  () => errorStore.errorList,
  (list) => {
    if (!list?.length) {
      return;
    }
    // 先拷贝再逐条从 store 移出，避免边遍历边修改源数组
    const pending = [...list];
    for (const item of pending) {
      errorStore.removeErrorList(item.id);
      errorLists.value.push({
        ...getOptions(item.res?.code),
        id: item.id,
        message: item.msg,
        visible: true,
        settled: false,
        showInfo: false,
        callback: item.callback,
        info: {
          url: item.url,
          method: item.method,
          code: item.res?.code,
          data: item.data ?? {},
          res: item.res,
        },
      });
    }
  },
  { deep: true },
);

function handleClose(item: ErrorDialogItem) {
  item.visible = false;
  if (item.settled) {
    return;
  }
  item.settled = true;
  errorStore.sureErrorObj(item.info.url ?? '');
  item.callback?.(item.info.res);
}

function handleClosed(item: ErrorDialogItem) {
  const index = errorLists.value.findIndex((c) => item.id === c.id);
  if (index !== -1) {
    errorLists.value.splice(index, 1);
  }
}

function getOptions(code: number | string | undefined): {
  color: string;
  icon: Component;
  title: string;
} {
  const value = Number(code);
  switch (true) {
    case value > 400 && value <= 405: {
      return {
        title: '警告',
        icon: markRaw(WarningFilled),
        color: 'var(--el-color-warning)',
      };
    }
    case value === 500: {
      return {
        title: '系统异常',
        icon: markRaw(CircleCloseFilled),
        color: 'var(--el-color-danger)',
      };
    }
    case value === 0:
    case value === 200: {
      return {
        title: '提示',
        icon: markRaw(SuccessFilled),
        color: 'var(--el-color-success)',
      };
    }
    default: {
      return {
        title: '提示',
        icon: markRaw(Warning),
        color: 'var(--el-color-warning)',
      };
    }
  }
}
</script>

<template>
  <ElDialog
    v-for="item in errorLists"
    :key="item.id"
    v-model="item.visible"
    append-to-body
    class="error-message-dialog"
    close-on-press-escape
    :title="item.title"
    width="fit-content"
    @close="handleClose(item)"
    @closed="handleClosed(item)"
  >
    <ElScrollbar max-height="60vh">
      <div class="dialog-content">
        <div class="message-title">
          <ElIcon :color="item.color" :size="36">
            <component :is="item.icon" />
          </ElIcon>
          <h4 class="title">{{ item.message }}</h4>
        </div>
        <template v-if="item.showInfo">
          <p class="text">
            <span class="no-wrap">请求接口：</span>
            {{ item.info.url }}
          </p>
          <p class="text">
            <span class="no-wrap">请求方法：</span>
            {{ item.info.method }}
          </p>
          <p class="text">
            <span class="no-wrap">请求参数：</span>
            {{ item.info.data }}
          </p>
          <p class="text">
            <span class="no-wrap">响应信息：</span>
            {{ item.info.res }}
          </p>
          <p class="text">
            <span class="no-wrap">响应状态：</span>
            {{ item.info.code }}
          </p>
        </template>
      </div>
    </ElScrollbar>
    <template #footer>
      <ElButton
        v-if="errorStore.showErrorBtn"
        @click="item.showInfo = !item.showInfo"
      >
        {{ item.showInfo ? '关闭详情' : '展开详情' }}
      </ElButton>
      <ElButton type="primary" @click="handleClose(item)">确定</ElButton>
    </template>
  </ElDialog>
</template>

<style>
/*
  弹窗宽度：Element Plus 默认 width:auto 会让块级 .el-dialog 撑满整个遮罩，
  这里用 fit-content 按内容自适应，并加上合理的最小/最大宽度。
  （class 会被透传到 .el-dialog 元素上，因此使用全局样式更可靠）
*/
.el-dialog.error-message-dialog {
  width: fit-content;
  min-width: 360px;
  max-width: min(90vw, 640px);
}
</style>

<style scoped>
.dialog-content {
  min-width: 320px;
  max-width: 50vw;
  min-height: 80px;
  overflow: hidden;
}

.message-title {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.message-title .title {
  max-width: calc(100% - 46px);
  margin: 8px 0 0 10px;
  font-size: 16px;
  line-height: 20px;
}

.text {
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 20px;
  white-space: pre-wrap;
  word-break: normal;
  word-wrap: break-word;
}

.text:first-of-type {
  padding-top: 30px;
}

.no-wrap {
  white-space: nowrap;
}
</style>
