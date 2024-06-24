import { ObjectId } from "https://deno.land/x/atlas_sdk/mod.ts";
import { automations } from "../server.ts";
import { IAutomation } from "../models/automation.ts";

// @ts-expect-error - Oak uses a different type for the context
const addAutomation = async (ctx) => {
    try {
        const body = await ctx.request.body.json();
        const automation: IAutomation = {
            _id: new ObjectId(),
            ...body,
        };

        if (!automation) {
            ctx.response.status = 400;
            ctx.response.body = { error: "Invalid data format" };
            return;
        }

        const insertAutomation = await automations.insertOne(automation);

        ctx.response.status = 201;
        ctx.response.body = { data: insertAutomation, automation: automation };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

// @ts-expect-error - Oak uses a different type for the context
const getAutomations = async (ctx) => {
    try {
        const allAutomations = await automations.find();
        ctx.response.status = 200;
        ctx.response.body = { data: allAutomations };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

// @ts-expect-error - Oak uses a different type for the context
const getAutomation = async (ctx) => {
    try {
        const automation = await automations.findOne({
            _id: new ObjectId(ctx.params.id),
        });

        if (!automation) {
            ctx.response.status = 404;
            ctx.response.body = { error: "Automation not found" };
            return;
        }

        ctx.response.status = 200;
        ctx.response.body = { data: automation };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

// @ts-expect-error - Oak uses a different type for the context
const updateAutomation = async (ctx) => {
    try {
        const body = await ctx.request.body.json();
        const automation: IAutomation = {
            ...body,
        };

        if (!automation) {
            ctx.response.status = 400;
            ctx.response.body = { error: "Invalid data format" };
            return;
        }

        const updateAutomation = await automations.updateOne(
            { _id: new ObjectId(ctx.params.id) },
            { $set: automation },
        );

        ctx.response.status = 200;
        ctx.response.body = { data: updateAutomation, automation: automation };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

// @ts-expect-error - Oak uses a different type for the context
const deleteAutomation = async (ctx) => {
    try {
        const automation = await automations.findOne({
            _id: new ObjectId(ctx.params.id),
        });

        if (!automation) {
            ctx.response.status = 404;
            ctx.response.body = { error: "Automation not found" };
            return;
        }

        const deleteAutomation = await automations.deleteOne({
            _id: new ObjectId(ctx.params.id),
        });

        ctx.response.status = 200;
        ctx.response.body = { data: deleteAutomation };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

export {
    addAutomation,
    deleteAutomation,
    getAutomation,
    getAutomations,
    updateAutomation,
};
