import { Client, GatewayIntentBits, REST } from "discord.js";
import { env } from "../config/env";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

export const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);
