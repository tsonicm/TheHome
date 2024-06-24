import { ObjectId } from "https://deno.land/x/atlas_sdk/mod.ts";
import { devices } from "../server.ts";
import IDevice from "../models/device.ts";

// @ts-expect-error - Oak uses a different type for the context
const addDevice = async (ctx) => {
    try {
        const body = await ctx.request.body.json();
        const device: IDevice = {
            _id: new ObjectId(),
            ...body,
        };

        if (!device) {
            ctx.response.status = 400;
            ctx.response.body = { error: "Invalid data format" };
            return;
        }

        const insertDevice = await devices.insertOne(device);

        ctx.response.status = 201;
        ctx.response.body = { data: insertDevice, device: device };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

// @ts-expect-error - Oak uses a different type for the context
const getDevices = async (ctx) => {
    try {
        const allDevices = await devices.find();
        ctx.response.status = 200;
        ctx.response.body = { data: allDevices };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

// @ts-expect-error - Oak uses a different type for the context
const getDevice = async (ctx) => {
    try {
        const device = await devices.findOne({
            _id: new ObjectId(ctx.params.id),
        });

        if (!device) {
            ctx.response.status = 404;
            ctx.response.body = { error: "Device not found" };
            return;
        }

        ctx.response.status = 200;
        ctx.response.body = { data: device };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

// @ts-expect-error - Oak uses a different type for the context
const updateDevice = async (ctx) => {
    try {
        const body = await ctx.request.body.json();
        const device = await devices.findOne({
            _id: new ObjectId(ctx.params.id),
        });

        if (!device) {
            ctx.response.status = 404;
            ctx.response.body = { error: "Device not found" };
            return;
        }

        const updateDevice = await devices.updateOne(
            { _id: new ObjectId(ctx.params.id) },
            { $set: body },
        );

        ctx.response.status = 200;
        ctx.response.body = { data: updateDevice };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

// @ts-expect-error - Oak uses a different type for the context
const deleteDevice = async (ctx) => {
    try {
        const device = await devices.findOne({
            _id: new ObjectId(ctx.params.id),
        });

        if (!device) {
            ctx.response.status = 404;
            ctx.response.body = { error: "Device not found" };
            return;
        }

        const deleteDevice = await devices.deleteOne({
            _id: new ObjectId(ctx.params.id),
        });

        ctx.response.status = 200;
        ctx.response.body = { data: deleteDevice };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message, fullError: error };
        return;
    }
};

export { addDevice, deleteDevice, getDevice, getDevices, updateDevice };
