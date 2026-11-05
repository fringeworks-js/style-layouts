/**
 * 有効な値か
 *
 * - 数値は有限の値のみ有効（`NaN`・`Infinity`はCSSの値にならないため無効）
 * - 文字列は空文字以外が有効
 * @param value
 * @returns
 */
export default function hasValue(
  value: string | number | boolean | null | undefined,
): value is string | number | boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  } else if (typeof value === 'boolean') {
    return true;
  } else {
    return value !== null && value !== undefined && value !== '';
  }
}
