import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios";
export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        })
    });
    return (
    <div>
        <AccountNav />
        <div>
            {bookings?.length > 0 && bookings.map(bookings => {
                <div>
                {bookings.checkIn} -> {bookings.checkOut}
                </div>;
            })}
        </div>
    </div>
    )
}