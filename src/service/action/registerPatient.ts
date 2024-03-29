'use server'

export const registerPatient = async (patientData: FormData) => {
    const res = await fetch(`${process.env.SERVER_URL}/user/create-patient`, {
        method: 'POST',

        body: patientData
    })
    const data = await res.json()
    return data
}