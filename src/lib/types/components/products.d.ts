import { Product } from "../end-point-api/products";

export = Products

namespace Products {
  
    export interface ProductItemProps {
        product: Product
        key?: string | number;
    }

    export interface FooterProductItemProps {
        product: Product
    }

    export interface RateStarsProps {
        rateCount: number
    }

}



