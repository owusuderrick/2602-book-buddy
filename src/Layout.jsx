import { Outlet } from "react-router";
import Navbar from "./auth/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
