
import { getTranslations } from 'next-intl/server';
import LayoutWrapper from '../../../_components/layout-wrapper';
import EditOccasion from '../../_components/edit-occasion';
import { GetOneOccasion } from '../../_hooks/get-occaion';

interface Props {
  params: { id: string };
}

export default async function EditOccasionPage({ params }: Props) {
  // Translation
  const t = await getTranslations('dashboard');

  // Params
  const { id } = params;

  // Hook
  const { data, error } = await GetOneOccasion(id);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" ">
      <LayoutWrapper
        disableFullHeight
        disableMainPadding
        breadcrumbOverrides={{
          edit: `Update Occasion: ${data?.occasion.name}`,
        }}
      >
        <section className="p-0">
          <h1 className="pb-6 font-inter text-2xl font-semibold capitalize text-zinc-800">
            {t('dashboard-occasion.occasion-update')}:{data?.occasion.name}
          </h1>
        </section>
      </LayoutWrapper>
      <div className="rounded-md bg-white dark:bg-zinc-400">
        <EditOccasion occasionId={id} occasionData={data!} />
      </div>
    </div>
  );
}
