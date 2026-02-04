"use client";
import { ProductsReviews } from './products-reviews';

export default function ReviewsSection() {
// useEffect(() => {
//   const fetchReviews = async () => {
//     try {
//       const reviews = await getReviews('673e2e1f1159920171828153');
//       console.log('Fetched Reviews:', reviews);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };

//   fetchReviews();
// }, []);
  
  return (
    <section className="container mx-auto flex w-11/12 flex-col py-10">
      <div>
        <ProductsReviews />
      </div>
      {/* <related/> */}
    </section>
  );
}
