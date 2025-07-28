export type BotStatus = "RUNNING" | "STOPPED" | "PAUSED" | "ERROR";

export interface Bots {
  id: number;
  botId: number;
  botName: string;
  name: string;
  description: string;
  createdDate: string;
  isActive: boolean;
}

export type CreateBotInput = {
  botName: string;
  description: string;
  settings: string;
};