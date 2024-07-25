import { differenceInCalendarDays } from 'date-fns';
import PropTypes from 'prop-types'
import { useState } from 'react';

export function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    return (
        <div className="bg-white rounded-2xl p-4 shadow">
        <div className="text-center text-2xl">
            Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
            <div className="flex">
                <div className="my-3 py-4 px-4">
                    <label>Check-in:</label>
                    <input type="date" 
                        value={checkIn} 
                        onChange={ev => setCheckIn(ev.target.value)}/>
                </div>
                <div className="my-3 py-4 px-4 border-l">
                    <label>Check-out</label>
                    <input type="date"
                        value={checkOut} 
                        onChange={ev => setCheckOut(ev.target.value)}/>
                </div>
            </div>
            <div className="my-3 py-4 px-4 border-t">
                    <label>Number of Guests</label>
                    <input type="number" 
                        value={numberOfGuests} 
                        onChange={ev => setNumberOfGuests(ev.target.value)}/>
            </div>
            {numberOfNights > 0 && (
                <div className="my-3 py-4 px-4 border-t">
                    <label>Your Full Name</label>
                    <input type="text" 
                            value={name} 
                            onChange={ev => setName(ev.target.value)}/>
                    <label>Your Phone Number</label>
                    <input type="tel" 
                            value={mobile} 
                            onChange={ev => setMobile(ev.target.value)}/>
                </div>
            )}
        </div>
        <button className="primary mt-4">
            Book this place
            {numberOfNights > 0 && (
                <span> ${numberOfNights * place.price}</span>
            )}
        </button>
    </div>
    )
}

BookingWidget.propTypes = {
    place: PropTypes.shape({
        price: PropTypes.number.isRequired,
    }).isRequired,
}
