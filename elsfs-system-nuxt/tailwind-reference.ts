import type { Plugin } from 'vite';

const TAILWIND_REFERENCE_LINE = '@reference "@vben/tailwind-config/theme";\n';
/**
 * 与 internal/vite-config 的 viteTailwindReferencePlugin 保持一致：
 * 向 Vue SFC 中使用 @apply 的 <style> 块自动注入 @reference，
 * 否则 Tailwind v4 会把每个 scoped style 当作独立 CSS 模块，
 * 对 bg-primary / pl-5 等自定义主题工具类报 "Cannot apply unknown utility class"。
 */
export function tailwindReferencePlugin(): Plugin {
  return {
    enforce: 'pre',
    name: 'nuxt:tailwind-reference',
    transform(code, id) {
      if (!id.includes('.vue') || !id.includes('type=style')) {
        return null;
      }
      if (code.includes('@reference') || !code.includes('@apply')) {
        return null;
      }
      return {
        code: TAILWIND_REFERENCE_LINE + code,
        map: null,
      };
    },
  };
}
