import userType from "../types/user.type";
import prisma from "../utils/prismaClient";

export const registerUserService = async (payload : userType) : Promise<userType> => {
    const data = await prisma.user.create({
        data : payload
    })

    return data
}