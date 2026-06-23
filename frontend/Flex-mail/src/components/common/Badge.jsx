export default function Badge({ count }) {
  if (!count) return null;
  return <span>{count > 99 ? "99+" : count}</span>;
}