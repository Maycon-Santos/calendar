export default function resolveClassName (...classNames: any[]) {
  return classNames.filter(Boolean).join(' ')
}
