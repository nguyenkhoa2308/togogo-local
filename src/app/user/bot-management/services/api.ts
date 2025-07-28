import { BotMessages } from "@/lib/constants";
import { Bots, CreateBotInput } from "../types";

const API_BASE_URL = "https://apibacktest.togogo.vn/api/DataManagement";

export class ApiService {
    static async loadBots(): Promise<Bots[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/bots`, {
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error(BotMessages.FETCH_FAILED);
            }
            return await response.json();
        } catch (error) {
            console.error("Error loading bots:", error);
            throw error;
        }
    }
    static async createBot(data: CreateBotInput): Promise<Bots> {
       try{
         const response = await fetch(`${API_BASE_URL}/bots`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(BotMessages.CREATE_FAILED);
        }

        const result: Bots = await response.json();
        return result;
       }catch(error){
            console.error("Error creating bot:", error);
            throw error;
       }
    }
    static async delete(id: number): Promise<Bots> {
        const response = await fetch(`${API_BASE_URL}/bots/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(BotMessages.DELETE_FAILED);
        }

        return await response.json();
    }

    static async update(id: number, data: Partial<Bots>): Promise<Bots> {
        const response = await fetch(`${API_BASE_URL}/bots/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(BotMessages.UPDATE_FAILED);
        }

        return await response.json();
    }



}