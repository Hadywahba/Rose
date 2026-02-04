'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldLabel
} from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  rating: z.number().min(1),
  Title: z.string().min(1).min(0).max(25),
  Review: z.string().max(250),
});

export default function ReviewForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <Field>
          <FieldLabel htmlFor="rating">your Rating:</FieldLabel>
          <Input id="rating" placeholder="" {...form.register('rating')} />

          <FieldError>{form.formState.errors.rating?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="Title">Title</FieldLabel>
          <Input
            id="Title"
            placeholder="enter review title"
            {...form.register('Title')}
          />

          <FieldError>{form.formState.errors.Title?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="Review">Review</FieldLabel>
          <Textarea
            id="Review"
            placeholder="What do you think of this product?"
            {...form.register('Review')}
          />

          <FieldError>{form.formState.errors.Review?.message}</FieldError>
        </Field>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
