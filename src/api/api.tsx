import axios from "axios"
import service from './apiRequest'
import { HistorySearch, HistoryMeGet, Mission, RobotMission } from "./ajax"

//const api = "http://localhost:8000/"
export interface HistoryResponseList {
    data: Mission[]
}

export const searchHistory = async (params: HistorySearch): Promise<Mission[] | string> => {
    try {
        const res = await service.get<HistoryResponseList>(
            "/dispatch/record", { params }
        );
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("error message", error.message);
            return error.message;
        } else {
            console.error("unexpected error", error);
            return "An expecte error has occured";
        }
    }
}

export const getHistoryMe = async (params: HistoryMeGet): Promise<Mission[] | string> => {
    try {
        const res = await service.get<HistoryResponseList>(
            "/dispatch/me", { params }
        );
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("error message", error.message);
            return error.message;
        } else {
            console.error("unexpected error", error);
            return "An expecte error has occured";
        }
    }
}

export const deleteMission = async (dispatch_id: string): Promise<Mission[] | string> => {
    try {
        const res = await service.patch<HistoryResponseList>(
            `/dispatch/${dispatch_id}`, {}
        )
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("error message", error.message);
            return error.message;
        } else {
            console.error("unexpected error", error);
            return "An expecte error has occured";
        }
    }
};

export const getRobotMission = async (params: RobotMission): Promise<Mission[] | string> => {
    try {
        const res = await service.get<HistoryResponseList>(
            "/homepage/mission", { params }
        );
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("error message", error.message);
            return error.message;
        } else {
            console.error("unexpected error", error);
            return "An expecte error has occured";
        }
    }
}

export const createMission = async (Path: string[]): Promise<Mission[] | string> => {
    try {
        const res = await service.post<HistoryResponseList>(
            `/dispatch/save`, { Path }
        )
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("error message", error.message);
            return error.message;
        } else {
            console.error("unexpected error", error);
            return "An expecte error has occured";
        }
    }
};