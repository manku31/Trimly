import { ApiServices } from "../helpers/apiServices"

export const signupbarber = async (data : object) => {
    const response = await ApiServices.postMiddlerware("/api/barbers/create-barber", data);
    return response;
}

export const otpResendBarber = async (data : object) => {
    const response = await ApiServices.postMiddlerware("/api/barbers/resend-otp", data);
    return response;
}

export const barberOtp = async (data : object) => {
    const response = await ApiServices.postMiddlerware("/api/barbers/verify-otp", data);
    return response;
}

export const createBarberShop = async (data : object) => {
    const response = await ApiServices.postMiddlerware("/api/barbers/create-shop", data);
    return response;
}