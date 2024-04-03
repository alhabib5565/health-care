
export const modifyPayload = (data: any) => {
    const values = { ...data }
    delete values.file
    const file = data.file
    const formData = new FormData()
    formData.append('data', JSON.stringify(values))
    formData.append('file', file)
    return formData
}