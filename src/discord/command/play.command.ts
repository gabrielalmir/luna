import type { ChatInputCommandInteraction, GuildMember } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { tryCatchAsync } from "resulta";
import { player } from "../../config/deps";
import type { Command, CommandCreateCommand } from "./command";

export class PlayCommand implements Command {
    private readonly name: string;
    private readonly description: string;

    constructor(props: CommandCreateCommand) {
        this.name = props.name;
        this.description = props.description;
    }

    async execute(ctx: ChatInputCommandInteraction): Promise<void> {
        await ctx.deferReply();
        const query = ctx.options.getString("query", true);

        const searchResult = await player.search(query, {
            requestedBy: ctx.user,
        });

        if (!searchResult.hasTracks()) {
            await ctx.followUp("Nenhum resultado encontrado para a busca.");
            return;
        }

        const queue = player.nodes.create(ctx.guild!, {
            metadata: {
                channel: ctx.channel,
            },
        });

        const track = searchResult.tracks[0];
        if (!track) {
            await ctx.followUp("Nenhuma música encontrada.");
            return;
        }

        const connection = await tryCatchAsync(async () => {
            if (!queue.connection) {
                const guildMember = ctx.member as GuildMember;
                await queue.connect(guildMember.voice.channel!);
            }
        });

        if (!connection.ok) {
            queue.delete();
            await ctx.followUp("Não foi possível conectar ao canal de voz.");
            return;
        }

        queue.addTrack(track);
        if (!queue.isPlaying()) await queue.play(track);

        await ctx.followUp(`Adicionado à fila: **${track.title}**`);
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
