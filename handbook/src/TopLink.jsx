import { Link, useLocation } from "react-router-dom";

export function TopLink({ to, label }) {
  const location = useLocation();
  return (
    <Link to={`/${to}`} className={location.pathname === `/${to}` ? "active" : ""}>
      {label}
    </Link>
  );
}
