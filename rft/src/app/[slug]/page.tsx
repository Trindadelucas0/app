import { redirect } from "next/navigation";
import { legacySlugToSlide, slideIds } from "@/data/slides";

export default async function AnchorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if ((slideIds as readonly string[]).includes(slug)) {
    redirect(`/#${slug}`);
  }
  const mapped = legacySlugToSlide[slug];
  if (mapped) {
    redirect(`/#${mapped}`);
  }
  redirect("/");
}
