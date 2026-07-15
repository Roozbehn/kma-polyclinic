export function canViewDepartment(dept: { faOnly?: boolean }, locale: string) {
  if (dept.faOnly) return locale === "fa";
  return true;
}
