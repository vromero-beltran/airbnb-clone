import { useState, useEffect } from "react";
import PhotoUploader from "../PhotosUploader.js";
import Perks from "../Perks.jsx";
import AccountNav from "../AccountNav.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function PlacesFormPage() {
  const {id} = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [price, setPrice] = useState(100);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState("");
    const [extraInfro, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuest, setMaxGuest] = useState(1);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

      if (!id) {
        return;
      }

      axios.get("/places/"+id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuest(data.maxGuest);
        setPrice(data.price);
      });
    }, [id]);

    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    }
    function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
    }
    function preInput(header, description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
    }
    async function savePlace(e) {
      e.preventDefault();
      const placeData ={
        title, address, addedPhotos,
        description, perks, extraInfro,
      checkIn,
      checkOut,
      maxGuest,
      price,
      };
      if (id) {
        //update
        await axios.put('/places', {
          id, ...placeData
        });
        setRedirect(true);
      } else {
        //new place
      }
      await axios.post('/places', placeData);
      setRedirect(true);
    }

    // This function might have to be deleted later
    // async function addPhotoByFile(e) {
    //     const files = e.target.files;
    //     const data = new FormData();
    //     data.set("photos", files);
    //     axios.post('/upload', data, {
    //       headers: {
    //         'Content-Type':'multipart/form-data'
    //       }
    //     }).then(response => {
    //       const {data:filename} = response;
    //       setAddedPhotos(prev => {
    //         return [...prev, filename];
    //       });
    //     })
    //     }

        setRedirect(true);
        if (redirect) {
          return <Navigate to = {'/account/places'} />
        }
    return (
        <div>
          <AccountNav />
          <form onSubmit={savePlace}>
            {preInput("Title", "Title for your place")}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title, for example: in New York"
            />
            {preInput("Address", "Address for your place")}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address, for example: 123 Main St"
            />
            {preInput("Photos", "Photos for your place")}
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            {preInput("Descriptions", "Describe your place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your place"
            />
            {preInput("Perks", "Select all of your perks for your place.")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Information", "House Rules, Etc")}
            {preInput("Perks", "Select all of your perks for your place.")}
            <textarea
              target={extraInfro}
              onChange={(e) => setExtraInfo(e.target.value)}
              placeholder="House Rules, Etc"
            />
            {preInput(
              "Check In & Out Times",
              "Add check in and out times, remember to have some time window for cleaning the room between guests."
            )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div className="class1">
                <h3 className="mt-2 -mb-1">Check In Time</h3>
                <input
                  type="time"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="11:00"
                />
              </div>
              <div className="class1">
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                <input
                  type="time"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="13:00"
                />
              </div>
              <div className="class1">
                <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
                <input
                  type="number"
                  value={maxGuest}
                  onChange={(e) => setMaxGuest(e.target.value)}
                  placeholder="1"
                />
              </div>
              <div className="class1">
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1"
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
    );
}