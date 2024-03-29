'use server'
import { FieldValues } from "react-hook-form"

export const loginUser = async (data: FieldValues) => {
    const res = await fetch(`${process.env.SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    })
    const userInfo = await res.json()
    return userInfo
}