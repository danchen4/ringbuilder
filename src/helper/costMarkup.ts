export function costMarkup(cost: number, markup: number, rounding:number = 10) {
  return Math.ceil(((cost * markup) / rounding)) * rounding
}