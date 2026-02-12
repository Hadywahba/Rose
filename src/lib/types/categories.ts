export type Category = {
  _id: string;
  slug: string;
  name: string;
  image?: string;
};

export type TransFn = {
  (id: string, params?: Record<string, unknown>): string;
  has: (id: string) => boolean;
};
