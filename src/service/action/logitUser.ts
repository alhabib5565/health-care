'use server'

import { TLoginUserInputs } from "@/app/login/page"

export const loginUser = async (data: TLoginUserInputs) => {
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