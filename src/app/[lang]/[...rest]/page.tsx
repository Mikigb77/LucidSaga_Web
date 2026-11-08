import { notFound } from "next/navigation";

/** Any path under a language that isn't a page shows that language's not-found page. */
export default function CatchAll() {
  notFound();
}
