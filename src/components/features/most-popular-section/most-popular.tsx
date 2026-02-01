
import TabsSection from "./tabs";
import HighlightedHeading from "@/components/shared/highlighted-heading";
import { Button } from "@/components/ui/button";
import { getOccasions } from "@/lib/apis/most-popular.api";


export default async function MostPopularSection() {
 interface Occasion {
    _id: string;
    name: string;
    productsCount: number;
  }

  const data = await getOccasions();

  if (!data?.occasions?.length) {
    return <p>No occasions found.</p>;
  }

/* Filter and sort occasions to prioritize those with the highest number of products */
  const topFour = data.occasions
    .filter((o: Occasion) => o.productsCount > 0)
    .sort((a: Occasion, b: Occasion) => b.productsCount - a.productsCount)
    .slice(0, 4);

  return (
    <div className="p-6">
      <HighlightedHeading text="Most Popular" highlightWidth="150px" borderWidth="60px" />
      {/* Render the tabs component and pass the top four occasions as props */}
       <TabsSection topFour={topFour} />
       <div className="flex justify-end">
        <Button variant='secondary' />View More
        <Button/>
       </div>
    </div>
  );
}
