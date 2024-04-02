import joi from "joi";
import productType from "../types/product.type";

export const productValidation = (payload: productType): joi.ValidationResult<productType> => {
    const schema = joi.object<productType>({
        name : joi.string().trim().required().messages({
            'string.base': 'Produk harus berupa string',
            'string.empty': 'Produk tidak boleh kosong',
            'any.required': 'Produk harus diisi'
        }),
        description : joi.string().trim().required().messages({
            'string.base': 'Deskripsi harus berupa string',
            'string.empty': 'Deskripsi tidak boleh kosong',
            'any.required': 'Deskripsi harus diisi'
        }),
        price : joi.number().required().messages({
            'number.base': 'Harga harus berupa angka',
            'number.empty': 'Harga tidak boleh kosong',
            'any.required': 'Harga harus diisi'
        })
    })

    return schema.validate(payload)
}