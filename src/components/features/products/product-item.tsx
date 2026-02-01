import { Card } from "@/components/ui/card";
import { ProductItemProps } from "@/lib/types/components/products";
import Link from "next/link";
import HeaderProductItem from "./header-product-item";
import Image from "next/image";
import FooterProductItem from "./footer-product-item";


export default function ProductItem({ key, product }: ProductItemProps) {
    const createdYear = new Date(product.createdAt).getFullYear();
    const isNewProduct = new Date().getFullYear() /* Date today */ - createdYear <= 1;
    const isOutOfStock = product.quantity <= 0;

    return (
        <Card key={key} className="flex h-[346px] flex-auto flex-col gap-4 border-none shadow-none">
            <Link href="/products" className="relative h-[272px] w-full overflow-hidden rounded-xl">
                <HeaderProductItem isNewProduct={isNewProduct} isOutOfStock={isOutOfStock} />
                <Image className="object-cover" src={product.imgCover} alt={product.title} fill />
            </Link>

            <FooterProductItem product={product} />
        </Card>
    );
}