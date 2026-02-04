'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InteractiveRating } from '@/components/ui/InteractiveRating';
import { Textarea } from '@/components/ui/textarea';
import { ratingFormSchema, RatingFormSchema } from '@/lib/schemas/add-review';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';



export default function ReviewForm() {
  const form = useForm<RatingFormSchema>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      rating: 0,
      title: '',
      comment: '',
    },
  });

  function onSubmit(values: RatingFormSchema) {
    console.log(values);
    toast.success(
      'Thank you for your review! It has been submitted successfully.',
    );
  }

  return (
    <div className="col-span-1 border-l pl-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-4"
        >
          <div className="flex items-center gap-4">
            <FieldLabel >Your Rating:</FieldLabel>
            <Controller
              name="rating"
              control={form.control}
              render={({ field }) => (
                <InteractiveRating
                  rating={field.value}
                  onRatingChange={field.onChange}
                  className="[&_svg]:size-6"
                />
              )}
            />
          </div>
          <FieldError>{form.formState.errors.rating?.message}</FieldError>

          <Field>
            <FieldLabel htmlFor="Title">Title</FieldLabel>
            <Input
              className="w-full"
              id="Title"
              placeholder="Enter review title"
              {...form.register('title')}
            />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="Review">Review</FieldLabel>
            <Textarea
              className="min-h-36"
              id="Review"
              placeholder="What do you think of this product?"
              {...form.register('comment')}
            />
            <FieldError>{form.formState.errors.comment?.message}</FieldError>
          </Field>

          <Button className="w-full" type="submit">
            Add Review
          </Button>
        </form>
      </Form>
    </div>
  );
}
