import Header from "@/components/shared/Header";
import { Outlet } from "react-router";

function DefaultLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
