import { Navigate, Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import PlacesPage from "./PlacesPage";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage ===undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout')
    setUser(null);
    setRedirect('/');
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'}></Navigate>
  }

  function linkClasses (type=null) {
    let classes = "inline-flex gap-1 py-2 px-4 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  
  return (
    <div>
      <nav className="w-full flex justify-center mt-4 gap-4 mb-8">
        <Link className={linkClasses('profile')} to={"/account"}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth={1.5} stroke="currentColor" 
        className="w-6 h-6">
        <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
          My Account</Link>
        <Link className={linkClasses('bookings')} to={'/account/booking'}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth={1.5} stroke="currentColor" 
        className="w-6 h-6">
        <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
        </svg>
          My Bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth={1.5} stroke="currentColor" 
        className="w-6 h-6">
        <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
          My Accomidations</Link>
      </nav>
      {subpage === "profile" && (
      <div className="text-center max-w-lg mx-auto">
        Logged in as {user.name} ({user.email})<br />
        <button onClick={logout} className="primary max-w-sm mt-2">logout</button>
      </div>
      )}
      {subpage === "places" && (
        <PlacesPage/>
        )}
    </div>
  );
}