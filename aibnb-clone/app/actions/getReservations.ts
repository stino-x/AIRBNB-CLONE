import prisma from '@/app/libs/prismadb';

interface Iparams {
    listingId?: string;
    userId?: string;
    authorId?: string; 
}

const getReservations = async (params: Iparams) => {
    try {
        const {listingId, userId, authorId} = params
        const query: any = {};
        if(listingId) {
            query.listingId = listingId
        }
    
        if(userId) {
            query.userId = userId
        }
    
        if(authorId) {
            query.listing = { userId: authorId}
        }
    
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy :{
                createdAt: 'desc'
            }
        });
    
        return reservations
    
        // const safeReservations = reservations.map((reservation) => ({
        //     ...reservation,
        //     createdAt: reservation.createdAt.toISOString(),
        // }))
    } catch (error: any) {
        console.error(error);
        throw new Error(error as string);
    }


};

export default getReservations;