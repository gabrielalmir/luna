export interface CommandOption {
    name: string;
    description: string;
    type: "string" | "number" | "boolean" | "user" | "channel" | "role" | "mentionable";
    required?: boolean;
}


export interface CommandCreateCommand {
    name: string;
    description: string;
}

export interface Command {
    execute(ctx: any): Promise<void>;
    toDiscordCommand?(): any;
}

