
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";
import getCurrentUSer from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request
) {
    const currentuser = await getCurrentUSer();
    if (!currentuser) {
        return NextResponse.error();
    }
    const body = await request.json()
    const { 
            category,
            location ,
            description ,
            price ,
            roomCount ,
            bathroomCount ,
            guestCount ,
            imageSrc ,
            title ,
     } = body

    const listing = await prisma.listing.create({
        data: {
            category,
            locationValue: location.value,
            description,
            price: parseInt(price, 10),
            roomCount,
            bathroomCount,
            guestCount,
            imageSrc,
            title,
            userId: currentuser.id,
        }
    })
    return NextResponse.json(listing);
}