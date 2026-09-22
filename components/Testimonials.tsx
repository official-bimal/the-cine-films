import { getPublishedTestimonials } from "@/lib/repositories/testimonials";
import TestimonialsClient from "./TestimonialsClient";

export default async function Testimonials() {
  const testimonials = await getPublishedTestimonials();

  return (
    <TestimonialsClient
      testimonials={testimonials.map((t) => ({
        _id: t.id,
        quote: t.quote,
        name: t.name,
        role: t.role,
        company: t.company,
        rating: t.rating,
        photoUrl: t.photoUrl,
      }))}
    />
  );
}
