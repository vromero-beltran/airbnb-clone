import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./app.css";
export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <Outlet />
        </div>
    );
}
