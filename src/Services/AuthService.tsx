import axios from "axios"
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfile, UserProfileToken } from "../Models/User";

const api = "http://localhost:8000/"

export const loginAPI = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(
            api + "login", {
            username: username,
            password: password,
        }
        )
        return data;
    } catch (error) {
        handleError(error);
    }

};

export const getUserInformation = async () => {
    try {
        const data = await axios.get<UserProfile>(
            api + "users/me"
        )
        return data.data;
    } catch (error) {
        handleError(error);
    }

};