import { useMainPlayer } from "discord-player";
import type { ChatInputCommandInteraction, GuildMember } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { tryCatchAsync } from "resulta";
import type { Command, CommandCreateCommand } from "./command";

export class PlayCommand implements Command {
    private readonly name: string;
    private readonly description: string;

    constructor(props: CommandCreateCommand) {
        this.name = props.name;
        this.description = props.description;
    }

    async execute(ctx: ChatInputCommandInteraction): Promise<void> {
        const player = useMainPlayer();
        const query = ctx.options.getString("query", true);

        const searchResult = await player.search(query, {
            requestedBy: ctx.user,
        });

        if (!searchResult || !searchResult.tracks.length) {
            await ctx.reply("Nenhum resultado encontrado para a busca.");
            return;
        }

        const track = searchResult.tracks[0];
        const queue = player.nodes.create(ctx.guild!, {
            metadata: {
                channel: ctx.channel,
            },
        });

        const connection = await tryCatchAsync(async () => {
            if (!queue.connection) {
                const guildMember = ctx.member as GuildMember;
                await queue.connect(guildMember.voice.channel!);
            }
        });

        if (!connection.ok) {
            queue.delete();
            await ctx.reply("Não foi possível conectar ao canal de voz.");
            return;
        }

        if (!track) {
            await ctx.reply("Nenhuma música encontrada.");
            return;
        }

        queue.addTrack(track);
        if (!queue.isPlaying()) await queue.play(track);

        await ctx.reply(`Adicionado à fila: **${track.title}**`);
    }

    toDiscordCommand() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) =>
                option
                    .setName("query")
                    .setDescription("URL ou termo de busca do YouTube")
                    .setRequired(true)
            )
            .toJSON();
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }
}
