export default function capitalizeFirstLetter(str: string): string {
  return str.replace(/^\w/, (c) => c.toUpperCase());
}