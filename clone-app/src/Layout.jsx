import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./app.css";
export default function Layout() {
    return (
        <div className="py-4 px-8 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    );
}
