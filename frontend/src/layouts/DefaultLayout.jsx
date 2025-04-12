import { Outlet } from "react-router-dom";
import Header from "./Header";


export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
