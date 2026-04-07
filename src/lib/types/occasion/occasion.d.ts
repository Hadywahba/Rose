export interface Occasion {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

export interface OccasionsResponse {
  metadata: MetaData
  occasions: Occasion[];
}

export interface OccasionResponse {
  message: string;
  occasion: Occasion;
}

export interface OccasionDocument {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DeleteOccasionResponse {
  message: string;
  document: OccasionDocument;
}
