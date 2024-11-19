import axios from "axios";
import axiosInstance, { axiosPixa } from "./axiosInstance"
import { paramTrailer, pixaParam, trailerResponse } from "../types";
import { pixaKey } from "./pixabayImg";

export const getVideos = async (params: pixaParam) => {
    try {
        const response = await axiosPixa.get(`videos?key=${pixaKey}`, {
            signal: params.signal
        })
        return response;
    } catch (error: any) {
        throw error;
    }
}