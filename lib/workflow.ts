import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstash.url!,
    token: config.env.upstash.qstash.token!,
});