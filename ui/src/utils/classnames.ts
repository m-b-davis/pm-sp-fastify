export function join(...classes: (string | undefined)[]): string {
  return classes.filter((name) => name !== undefined).join(' ');
}
