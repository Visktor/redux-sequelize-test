export type DeepPartial<T> = {
  [k in keyof T]?: T extends Record<string, unknown>
    ? DeepPartial<T[k]>
    : T[k] | undefined;
};

export type KeysOfType<O extends Record<string, unknown>, T> = {
  [key in keyof O]: O[key] extends T ? key : never;
}[keyof O];
