import prisma from '@/app/libs/prismadb';

const getLisitings = async () => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return listings;
    } catch (error) {
        console.error(error);
        throw new Error(error as string);
    }
};

export default getLisitings;