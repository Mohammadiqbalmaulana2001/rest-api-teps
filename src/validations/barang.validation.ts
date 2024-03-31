import joi, { ValidationResult } from "joi";
import barangType from "../types/barang.type";

export const barangValidation = (payload: barangType): ValidationResult<barangType> => {
    const schema = joi.object<barangType>({
        nama : joi.string().trim().required().messages({
            'string.base': 'Barang harus berupa string',
            'string.empty': 'Barang tidak boleh kosong',
            'any.required': 'Barang harus diisi'
        }),
        jumlah : joi.number().required().messages({
            'number.base': 'Jumlah harus berupa angka',
            'number.empty': 'Jumlah tidak boleh kosong',
            'any.required': 'Jumlah harus diisi'
        }),
        harga : joi.number().required().messages({
            'number.base': 'Harga harus berupa angka',
            'number.empty': 'Harga tidak boleh kosong',
            'any.required': 'Harga harus diisi'
        })
    })

    return schema.validate(payload)
}
