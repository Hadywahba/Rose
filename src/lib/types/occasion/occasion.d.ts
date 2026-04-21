export interface Occasion {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  immutable: boolean;
}

export interface OccasionsResponse {
  metadata: MetaData;
   data: Occasion[];
}

// export interface OccasionResponse {
//   message: string;
//   occasion: Occasion;
// }

export interface OccasionDocument {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  immutable: boolean;
}

export interface DeleteOccasionResponse {
  message: string;
  document: OccasionDocument;
}
