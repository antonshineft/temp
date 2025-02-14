
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 p-8 animate-fadeIn">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
