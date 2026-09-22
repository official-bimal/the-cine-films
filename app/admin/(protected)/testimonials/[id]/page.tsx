import { notFound } from "next/navigation";
import { getTestimonialById } from "@/lib/repositories/testimonials";
import { updateTestimonialAction } from "@/lib/actions/testimonials";
import { pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function EditTestimonialPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const testimonial = await getTestimonialById(params.id);
  if (!testimonial) notFound();

  return (
    <div className="max-w-xl">
      <h1 className={pageTitle}>Edit Testimonial</h1>
      <div className="mt-6">
        <Banner error={searchParams.error} />
      </div>
      <TestimonialForm testimonial={testimonial} action={updateTestimonialAction.bind(null, params.id)} />
    </div>
  );
}
