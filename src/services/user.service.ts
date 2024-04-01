import userType from "../types/user.type";
import prisma from "../utils/prismaClient";

export const registerUserService = async (payload : userType) : Promise<userType> => {
    const data = await prisma.user.create({
        data : payload
    })

    return data
}

export const loginUserService = async (payload : userType) : Promise<userType | null> => {
    const data = await prisma.user.findUnique({
        where : {
            email : payload.email
        }
    })

    return data
}