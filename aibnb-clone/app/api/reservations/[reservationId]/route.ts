import getCurrentUSer from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUSer();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId }= params;
    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid listing ID');
    }

    // let favouriteIds = [...(currentUser.favouriteIds || [])];
    // favouriteIds = favouriteIds.filter((id) => id !== listingId);  // Fix: reassign the filtered array

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {
                    userId: currentUser.id,
                },
                {
                    listing: {
                        userId: currentUser.id
                    }
                }
            ]
        },
    });

    return NextResponse.json(reservation);
}