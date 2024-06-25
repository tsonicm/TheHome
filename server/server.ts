import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { MongoClient } from "https://deno.land/x/atlas_sdk/mod.ts";
import IDevice from "./models/device.ts";
import { IAutomation } from "./models/automation.ts";
import router from "./router.ts";
import AutomationRunner from "./runner/runner.ts";

const PORT = 8001;
const app = new Application();

const { MONGO_ENDPOINT, MONGO_DATA_SOURCE, MONGO_API_KEY, MONGO_DB_NAME } =
    config();

export const mongoClient = new MongoClient({
    endpoint: MONGO_ENDPOINT,
    dataSource: MONGO_DATA_SOURCE,
    auth: {
        apiKey: MONGO_API_KEY,
    },
});

export const db = mongoClient.database(MONGO_DB_NAME);
export const devices = db.collection<IDevice>("devices");
export const automations = db.collection<IAutomation>("automations");

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${PORT}`);

const automationRunner = new AutomationRunner([]);

// Run the tasks once
automationRunner.run();

// Run automations every minute
setInterval(automationRunner.run.bind(automationRunner), 1000 * 60); // 1 minute

await app.listen({ port: PORT });
