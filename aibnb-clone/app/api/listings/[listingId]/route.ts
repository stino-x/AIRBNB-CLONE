import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid listing ID');
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid listing ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        },
    });

    return NextResponse.json(listing);
}