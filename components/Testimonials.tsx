import { testimonials as placeholderTestimonials } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/fetch";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import TestimonialsClient from "./TestimonialsClient";

type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
  photoUrl: string | null;
};

export default async function Testimonials() {
  const cms = await sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY);
  const testimonials: Testimonial[] =
    cms && cms.length > 0
      ? cms
      : placeholderTestimonials.map((t, i) => ({
          _id: `placeholder-${i}`,
          quote: t.quote,
          name: t.name,
          role: t.role,
          company: t.company,
          rating: t.rating,
          photoUrl: null,
        }));

  return <TestimonialsClient testimonials={testimonials} />;
}
