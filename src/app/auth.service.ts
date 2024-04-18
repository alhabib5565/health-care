import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local.storage"
import { authkey } from "./constant/authkey"
import { decodeToken } from "@/utils/decodeToken"
import { instance as axiosInstance } from "@/helpers/axiosInstance"

export const storeUserInfo = (accessToken: string) => {
    return setToLocalStorage(authkey, accessToken)
}

export const getUserInfo = () => {
    const accessToken = getFromLocalStorage(authkey)
    if (accessToken) {
        const userInfo: any = decodeToken(accessToken)
        return {
            ...userInfo,
            role: userInfo.role.toLowerCase()
        }
    }
}

export const isUserLoggedIn = () => {
    const accessToken = getFromLocalStorage(authkey)
    if (accessToken) {
        return !!accessToken
    }
}

export const removeUser = () => {
    return removeFromLocalStorage(authkey)
}

export const getAccessToken = async () => {
    return await axiosInstance({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/auth/refresh-token',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })

}