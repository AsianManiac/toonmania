export default function makeURLFriendly(url: string | any): string {
  if (typeof url !== "string") {
    throw new Error("Input url must be a string");
  }

  url = url.trim();

  return url.replace(/\s+/g, "-").toLowerCase();
}
