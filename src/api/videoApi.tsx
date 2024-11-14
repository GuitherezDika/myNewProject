import axios from "axios";
import axiosInstance from "./axiosInstance"
import { paramTrailer, trailerResponse } from "../types";

interface ApiRespons {
    id: number;
    results: trailerResponse[]
}

export const getTrailer = async (params: paramTrailer & {signal: AbortSignal})  => {
    try {
        const response = await axiosInstance.get<ApiRespons>('movie/533535/videos', {
            params,
            signal: params.signal
        });
        return response.data.results;
    } catch (error: any) {
        if(axios.isCancel(error)){
            console.log("Request dibatalkan:", error.message);
        } else {
            throw new Error(`Failed to fetch data: ${error}`);
        }
    }
}