import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            Add New Place
          </Link>
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
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            <h2>Title</h2>
            <input type="text" placeholder="Title, for example: in New York" />
            <h2>Address</h2>
            <input type="text" placeholder="Address, for example: 123 Main St"/>
            <h2>Photos</h2>
          </form>
        </div>
      )}
    </div>
  );
}
