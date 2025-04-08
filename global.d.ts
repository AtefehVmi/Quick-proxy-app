declare global {
  type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

  type Option<A = unknown, B = unknown> = {
    label: string;
    value: A;
    icon?: React.ReactNode;
    extra?: B;
  };

  interface Window {
    // eslint-disable-next-line
    $crisp: any;
  }

  type Nullable<T> = { [K in keyof T]: T[K] | null };
}

export {};
