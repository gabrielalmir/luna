import { type Client } from "discord.js";
import { tryCatchAsync } from "resulta";
import { discordCommandManager } from "../config/deps";

export default class ClientReadyEvent {
    public static async execute(ctx: Client<true>): Promise<void> {
        console.log(`Logged in as ${ctx.user.tag} (${ctx.user.id})`);

        const registeredCommands = await tryCatchAsync(async () => {
            console.log("Registering commands...");
            await discordCommandManager.registerCommands();
        });

        if (!registeredCommands.ok) {
            console.error("Failed to register commands", registeredCommands.error);
            process.exit(1);
        }

        console.log("Commands registered successfully");
    }
}
