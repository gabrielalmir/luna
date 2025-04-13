import { Player } from "discord-player";
import { HiCommand } from "../discord/command/hi.command";
import { PlayCommand } from "../discord/command/play.command";
import { DiscordCommandManager } from "../discord/manager";
import { DiscordPlayer } from "../discord/player";
import { client } from "../lib/discord";

// commands
const hiCommand = new HiCommand({ name: "hi", description: "Replies with hi!" });
const playCommand = new PlayCommand({ name: "play", description: "Plays a song!" });

// discord
export const discordCommandManager = new DiscordCommandManager([
    hiCommand,
    playCommand,
]);

// player
const discordPlayer = new DiscordPlayer(new Player(client));
discordPlayer.configure();

export const player = discordPlayer.getPlayer();
