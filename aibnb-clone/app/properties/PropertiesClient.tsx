import { Listing, Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    listings: Listing[];
    currentUser?: User;
  }
  
  const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, currentUser }) => {
    // Implement the component logic here
    // You can access the props like this:
    console.log(listings);
    console.log(currentUser);
    const router = useRouter()
    const [deletingId, setdeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setdeletingId(id)

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('lisitng deleted')
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
            title='Properties'
            subtitle='List of Properties'/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 2xl:grid-cols-6 ">
                {listings.map((listing) => (
                    <ListingCard 
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel="cancel reservation"
                    currentUser={currentUser}/>
                ))}
            </div>
        </Container>
    );
  };
  
  export default PropertiesClient;