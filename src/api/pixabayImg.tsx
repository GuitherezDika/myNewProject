import axios from "axios";
import axiosInstance, { axiosPixa } from "./axiosInstance"
import { paramTrailer, pixaParam, trailerResponse } from "../types";

interface ApiRespons {
    id: number;
    results: trailerResponse[]
}

const pixaKey = '46918576-4f75666adce4ddbf7c8a4d935';
export const getImage = async (params: pixaParam) => {
    try {
        const response = await axiosPixa.get(`?key=${pixaKey}`, {
            signal: params.signal
        })
        return response;
    } catch (error: any) {
        throw error;
    }
}