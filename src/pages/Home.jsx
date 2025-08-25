import { Outlet } from "react-router";
import HomeLinks from "../menubars/Mbar";

export function Home() {
  return (
    <>
      <div>
        <HomeLinks />
        <Outlet />
      </div>
    </>
  );
}
