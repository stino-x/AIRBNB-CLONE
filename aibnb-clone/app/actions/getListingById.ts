import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        console.log('getListingById params:', JSON.stringify(params));
        const { listingId } = params;
        console.log('getListingById params:', listingId);

        if (!listingId) {
            throw new Error("Listing ID is missing");
        }

        // const listingIdString = listingId.toString();

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if (!listingId) {
            throw new Error("Listing ID is missing");
        }

        return listing || null; // Return null if listing is not found
    } catch(error: any) {
        throw new Error("Error retrieving listing: " + error.message);
        // ^^^ Throw a new Error object with a custom message
    }
}
