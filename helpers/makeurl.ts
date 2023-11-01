export default function makeURLFriendly(url: string): string {
  if (typeof url !== "string") {
    throw new Error("Input url must be a string");
  }

  url = url.trim();

  return url.replace(/\s+/g, "-").toLowerCase();
}

export function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug;
}
