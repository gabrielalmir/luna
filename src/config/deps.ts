import { Player } from "discord-player";
import { PlayCommand } from "../discord/command/play.command";
import { DiscordCommandManager } from "../discord/manager";
import { DiscordPlayer } from "../discord/player";
import { client } from "../lib/discord";

// commands
const playCommand = new PlayCommand({ name: "play", description: "Plays a song!" });

// discord
export const discordCommandManager = new DiscordCommandManager([
    playCommand,
]);

// player
const discordPlayer = new DiscordPlayer(new Player(client));
discordPlayer.configure();

export const player = discordPlayer.getPlayer();
