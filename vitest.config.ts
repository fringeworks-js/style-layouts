import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: { enabled: true },
    exclude: [...configDefaults.exclude, '**/*.e2e.spec.ts'],
    typecheck: {
      // `*.test-d.ts`の型アサーションをテストとして実行する
      enabled: true,
      tsconfig: './tsconfig.json',
    },
  },
});
