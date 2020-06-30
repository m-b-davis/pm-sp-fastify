type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export function mockAs<T>(value: DeepPartial<T>): T {
  return value as T;
}
