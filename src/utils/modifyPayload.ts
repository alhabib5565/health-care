
export const modifyPayload = (data: any) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(data))
    return formData
}