export default function classNameResolve (...classNames: any[]) {
  return classNames.filter(Boolean).join(' ')
}
