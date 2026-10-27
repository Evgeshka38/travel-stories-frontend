export function formatDateFromApi(date: string | null | undefined): string {
  if (!date) return '';

  const [yyyy, mm, dd] = date.split('-');
  return `${dd}.${mm}.${yyyy}`;
}
