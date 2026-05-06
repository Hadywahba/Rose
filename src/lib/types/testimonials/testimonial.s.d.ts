declare type AddTestimonialResponse = {
  testimonial: {
    id: string;
    name: string;
    email: string;
    content: string;
    rating: number;
    image: string | null;
    isApproved: boolean;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

declare type TestimonialsData = {
  data: Testimonial[];
  metadata: MetaData;
};

declare type Testimonial = {
  id: string;
  name: string;
  email: string;
  content: string;
  rating: number;
  image: string | null;
  isApproved: boolean;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
};
