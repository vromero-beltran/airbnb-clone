import { useParams } from "react-router-dom";
export default function BookingPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Signel booking: {id}</h1>
    </div>
  );
}