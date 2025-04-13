import { Routes } from "discord.js";
import { env } from "../config/env";
import { rest } from "../lib/discord";
import { CommandCache } from "./cache";
import type { Command } from "./command/command";
import { CommandRegistry } from "./registry";

export class DiscordCommandManager {
    private readonly cache: CommandCache;
    private readonly commands: CommandRegistry;

    constructor(commandsList: Command[]) {
        this.cache = new CommandCache("commands.json");
        this.commands = new CommandRegistry(commandsList);
    }

    public async deleteAllPreviousCommands(): Promise<void> {
        const cachedCommands = await this.cache.load();

        if (!cachedCommands.ok) {
            await rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID), { body: [] });
        }
    }

    public async registerCommands(): Promise<void> {
        const cachedCommands = await this.cache.load();
        if (cachedCommands.ok) return;

        const serializedCommands = this.commands.serialize();
        await rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID), {
            body: serializedCommands,
        });

        await this.cache.save(serializedCommands);
    }

    public getCommand(name: string): Command | undefined {
        return this.commands.find(name);
    }
}



