import { NavLink, Link } from "react-router";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header>
      <Link to="/">
        <img src="/books.png" alt="" />
        <p>Book Buddy</p>
      </Link>
      <nav>
        <NavLink to="/book">Books</NavLink>
        {token ? (
          <>
            <NavLink to="/account">Account</NavLink>
            <a href="*" onClick={logout}>
              Log out
            </a>
          </>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
