import { Listing, Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: (Reservation & { listing: Listing })[];
    currentUser: User;
  }
  
  const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
    // Implement the component logic here
    // You can access the props like this:
    console.log(reservations);
    console.log(currentUser);
    const router = useRouter()
    const [deletingId, setdeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setdeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('reservation cancelled')
        })
        .catch((error) => {
            toast.error(error?.responese?.data?.error)
            router.refresh()
        })
        .finally(() => {
            setdeletingId('')
        })
    }, [router])
  
    return (
        <Container>
            <Heading 
            title='Trips'
            subtitle='where youve been and where youre going'/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 2xl:grid-cols-6 ">
                {reservations.map((reservation) => (
                    <ListingCard 
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="cancel reservation"
                    currentUser={currentUser}/>
                ))}
            </div>
        </Container>
    );
  };
  
  export default TripsClient;