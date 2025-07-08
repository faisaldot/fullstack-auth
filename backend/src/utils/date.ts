export function oneYearFromNow() {
  return new Date(
    Date.now() + 364 * 24 * 60 * 60 * 1000,
  )
}
