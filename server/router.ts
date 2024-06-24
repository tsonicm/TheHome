import { Router } from "https://deno.land/x/oak/mod.ts";
import {
    addDevice,
    deleteDevice,
    getDevice,
    getDevices,
    updateDevice,
} from "./controllers/devices.ts";
import {
    addAutomation,
    deleteAutomation,
    getAutomation,
    getAutomations,
    updateAutomation,
} from "./controllers/automations.ts";

const router = new Router();

// Devices routes
router.post("/api/devices/addDevice", addDevice);
router.get("/api/devices/getDevices", getDevices);
router.get("/api/devices/getDevice/:id", getDevice);
router.put("/api/devices/updateDevice/:id", updateDevice);
router.delete("/api/devices/deleteDevice/:id", deleteDevice);

// Automations routes
router.post("/api/automations/addAutomation", addAutomation);
router.get("/api/automations/getAutomations", getAutomations);
router.get("/api/automations/getAutomation/:id", getAutomation);
router.put("/api/automations/updateAutomation/:id", updateAutomation);
router.delete("/api/automations/deleteAutomation/:id", deleteAutomation);

export default router;
