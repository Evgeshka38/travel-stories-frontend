export function formatDateFromApi(date: string | null | undefined): string {
  if (!date) return '';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return '';

  const dd = String(parsed.getUTCDate()).padStart(2, '0');
  const mm = String(parsed.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = parsed.getUTCFullYear();
  return `${dd}.${mm}.${yyyy}`;
}
