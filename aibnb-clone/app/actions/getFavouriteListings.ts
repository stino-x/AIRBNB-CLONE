import prisma from "@/app/libs/prismadb"
import getCurrentUSer from "./getCurrentUser";

interface IParams {
    listingId?: string;
}

export default async function getFavouriteListings() {
    try {
    const currentuser = await getCurrentUSer()

    if (!currentuser) {
        return null
    }

    const favourites = await prisma.listing.findMany({
        where: {
            id: {
                in: [... (currentuser.favouriteIds || [])]
            }
        }
    });

    const safeFavourites = favourites.map((favourite) => ({
        ...favourite,
    }))

    return safeFavourites;
    } catch(error: any) {
        throw new Error(error);
    }
}