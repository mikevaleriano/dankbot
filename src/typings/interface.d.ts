import { MessageEmbed } from "discord.js";

export interface CustomEmbed {
  embed: MessageEmbed;
  extra: string | null;
}
