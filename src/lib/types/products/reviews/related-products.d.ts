export interface RelatedProductsResponse {
  message: string
  count: number
  relatedProducts: RelatedProduct[]
}

export interface RelatedProduct {
  _id: string
  title: string
  imgCover: string
  price: number
  priceAfterDiscount: number
  rateAvg: number
  rateCount: number
  id: string
}
