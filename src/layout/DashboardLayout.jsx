import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

export default function DashboardLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
