import productType from "../types/product.type";
import prisma from "../utils/prismaClient";

export const getProductService = async () : Promise<productType[] | null>  => {
    const data: productType[] = await prisma.product.findMany();
    return data
}

export const getProductByIdService = async (id : number) : Promise<productType | null> => {
    const data = await prisma.product.findUnique({
        where : {
            id
        }
    })

    return data
}

export const postProductService = async (payload : productType) : Promise<productType> => {
    const data = await prisma.product.create({
        data : {
            name : payload.name,
            description : payload.description,
            price : payload.price
        }
    })

    return data
}

export const updateProductService = async ( payload : productType) : Promise<productType> => {  
    const data = await prisma.product.update({
        where : {
            id : payload.id
        },
        data : {...payload}
    })
    return data
}

export const deleteProductService = async (payload : productType) : Promise<productType> => {
    const data = await prisma.product.delete({
        where : {
            id : payload.id
        }
    })
    return data 
}