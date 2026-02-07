import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { cn } from '@/lib/utility/tailwind-merge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'> & {
  locale?: string;
};

export const NextButton: React.FC<PropType> = ({
  className,
  disabled,
  locale,
  ...props
}) => {
  return (
    <Button
      variant="carousel"
      disabled={disabled}
      size={'default'}
      className={cn(
        '',
        disabled ? 'text-gray-700' : 'text-amber-700',
        className,
      )}
      {...props}
    >
      {locale === 'ar' ? <ChevronLeft size={30} /> : <ChevronRight size={30} />}
    </Button>
  );
};

export const PrevButton: React.FC<PropType> = ({
  className,
  disabled,
  locale,
  ...props
}) => {
  return (
    <Button
      variant="carousel"
      size={'default'}
      disabled={disabled}
      className={cn(
        '',
        disabled ? 'text-gray-700' : 'text-amber-700',
        className,
      )}
      {...props}
    >
      {locale === 'ar' ? <ChevronRight size={30}  /> : <ChevronLeft size={30} />}
    </Button>
  );
};
