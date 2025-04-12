import { HiCommand } from "../discord/command/hi.command";
import { PlayCommand } from "../discord/command/play.command";
import { DiscordCommandManager } from "../discord/manager";

// commands
const hiCommand = new HiCommand({ name: "hi", description: "Replies with hi!" });
const playCommand = new PlayCommand({ name: "play", description: "Plays a song!" });

// discord
export const discordCommandManager = new DiscordCommandManager([
    hiCommand,
]);
