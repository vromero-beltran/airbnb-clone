import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddres] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfro, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header, description) {
    return (
      <>
      {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

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
      {action === "new" && (
        <div>
          <form>
            {preInput("Title", "Title for your place")}
            <input type="text" placeholder="Title, for example: in New York" />
            {preInput("Address", "Address for your place")}
            <input
              type="text"
              placeholder="Address, for example: 123 Main St"
            />
            {preInput("Photos", "Photos for your place")}
            <div className="flex gap-2">
              <input type="text" placeholder={"Add using a Link ...jpg"} />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </button>
            </div>
            {preInput("Descriptions", "Describe your place")}
            <textarea></textarea>
            {preInput("Perks", "Select all of your perks for your place.")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks />
            </div>
            {preInput("Extra Information", "House Rules, Etc")}
            {preInput("Perks", "Select all of your perks for your place.")}
            <textarea />
            {preInput(
              "Check In & Out Times",
              "Add check in and out times, remember to have some time window for cleaning the room between guests."
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="class1">
                <h3 className="mt-2 -mb-1" >Check In Time</h3>
                <input type="time" placeholder="11:00" />
              </div>
              <div className="class1">
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                <input type="time" placeholder="13:00" />
              </div>
              <div className="class1">
                <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
                <input type="time" />
              </div>
            </div>
            <div>
              <button className="primary my-4" >Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
