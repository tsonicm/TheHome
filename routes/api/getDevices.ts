// Call 'localhost:8001/api/getDevices' to get all devices
// Call 'localhost:8001/api/getDevice/:id' to get a specific device
// Call 'localhost:8001/api/updateDevice/:id' to update a specific device
// Call 'localhost:8001/api/deleteDevice/:id' to delete a specific device
// Call 'localhost:8001/api/addDevice' to add a new device

import { IDeviceProps } from "../../islands/Home.tsx";
import { FreshContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: FreshContext) => {
    try {
        const devices = await fetch(
            "http://localhost:8001/api/devices/getDevices",
        );
        const data = await devices.json();
        return new Response(JSON.stringify(data), {
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message, fullError: error }),
            {
                status: 500,
                headers: { "content-type": "application/json" },
            },
        );
    }
};

export const getDevices = async () => {
    try {
        const devices = await fetch(
            "http://localhost:8001/api/devices/getDevices",
        );
        const data = await devices.json();
        return data.allDevices;
    } catch (error) {
        console.error(error);
        return [];
    }
};
