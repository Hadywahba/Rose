declare type AddTestimonialResponse = {
  testimonial: {
    id: string;
    name: string;
    email: string;
    content: string;
    rating: number;
    image: string;
    isApproved: boolean;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
