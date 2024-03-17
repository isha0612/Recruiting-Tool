import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

declare global {
    var config: CustomConfig;
}

const customConfig = z.object({
    port: z.string().default('8001'),
    nodeEnv: z.string().default("development"),
    databaseUrl: z.string(),
    jwtSecret: z.string(),
    jwtExpiresIn: z.string(),
})

type CustomConfig = z.infer<typeof customConfig>;

const getConfig = (): CustomConfig => {
    const customConfigParsed = customConfig.safeParse({
        port: process.env.PORT,
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL,
        jwtSecret: process.env.JWTSECRET,
        jwtExpiresIn: process.env.JWTEXPIRATION,
    });
    if (!customConfigParsed.success) {
        throw new Error(customConfigParsed.error.message);
    }
    return customConfigParsed.data;
}

export type { CustomConfig };

global.config = getConfig();