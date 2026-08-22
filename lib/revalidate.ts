import { revalidatePath } from "next/cache";

export function revalidateListings(
  kind: "land" | "property",
  ...ids: string[]
) {
  const base = kind === "land" ? "/land" : "/properties";
  revalidatePath("/");
  revalidatePath(base);
  for (const id of ids) {
    if (id) revalidatePath(`${base}/${id}`);
  }
}
