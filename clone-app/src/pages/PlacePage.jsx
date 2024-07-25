import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    useEffect(() => {
        if  (id) {
            return;
        }
    axios.get("/places/${id}").then((response) => {
        setPlace(response.data);
    });
    }, [id]);

    if (!place) {
        return "";
    }

    return (
        <div className="mt-4 bg-gray-500 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="my-2 block font-semibold underline" target="_blank" rel="noreferrer" href={"https://maps.google.com/?q="+place.address}>{place.address}</a>
        </div>
    );
}
