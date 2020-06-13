export function costMarkup(cost: number, markup: number) {
  return Math.ceil(((cost * markup) / 10) * 10)
}