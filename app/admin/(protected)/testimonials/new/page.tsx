import { createTestimonialAction } from "@/lib/actions/testimonials";
import { pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-xl">
      <h1 className={pageTitle}>Add Testimonial</h1>
      <div className="mt-6">
        <Banner error={searchParams.error} />
      </div>
      <TestimonialForm testimonial={null} action={createTestimonialAction} />
    </div>
  );
}
