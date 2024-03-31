import type barangType from "../types/barang.type";
import prisma from "../utils/prismaClient";

export const getBarangService = async () : Promise<barangType[] | null>  => {
    const data: barangType[] = await prisma.barang.findMany();
    return data
}

export const getBarangByIdService = async (id : number) : Promise<barangType | null> => {
    const data = await prisma.barang.findUnique({
        where : {
            id
        }
    })

    return data
}
export const postBarangService = async (payload : barangType) : Promise<barangType> => {
    const data = await prisma.barang.create({
        data : payload
    })

    return data
}

export const updateBarangService = async ( payload : barangType) : Promise<barangType> => {
    const data = await prisma.barang.update({
        where : {
            id : payload.id
        },
        data : {...payload}
    })
    return data
}

export const deleteBarangService = async (payload : barangType) : Promise<barangType> => {
    const data = await prisma.barang.delete({
        where : {
            id : payload.id
        }
    })
    return data
}