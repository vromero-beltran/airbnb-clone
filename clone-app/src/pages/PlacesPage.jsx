import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useSate } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setplaces] = useSate([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setplaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Place
        </Link>
        <div className="mt-4" >
          {places.length > 0 && places.map([place => (
            <div className="bg-gray-200 p-4 rounded-2-l" >
              {place.title}
            </div>
          )])}
        </div>
      </div>
    </div>
  );
}
