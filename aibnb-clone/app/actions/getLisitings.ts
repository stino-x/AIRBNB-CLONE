import prisma from '@/app/libs/prismadb';

export interface ILisitingParams {
    // userId?: string;
    guestCount?: number,
    roomCount?: number,
    bathroomCount?: number,
    startDate?: string,
    endDate?: string,
    locationValue?: string,
    category?: string,
}

const getLisitings = async (params: ILisitingParams) => {
    try {
        const { guestCount,roomCount, bathroomCount, startDate, endDate, locationValue, category } = params

        let query: any = {};

        // if (userId) {
        //     query.userId = userId
        // }

        if (category) {
            query.category = category
        }

        if (locationValue) {
            query.locationValue = locationValue
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                startDate: {
                                    lte: startDate
                                },
                                endDate: {
                                    gte: startDate
                                }
                            },
                            {
                                startDate: {
                                    lte: endDate
                                },
                                endDate: {
                                    gte: endDate
                                }
                            }
                        ]
                    }
                }
            }
        }
        const listings = await prisma.listing.findMany({
            where: query,
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