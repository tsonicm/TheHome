import { IAutomation } from "../models/automation.ts";
import { updateDevice } from "../controllers/devices.ts";

export default class AutomationRunner {
    private automationsList: IAutomation[];

    constructor(
        automationList: IAutomation[],
    ) {
        this.automationsList = automationList;
    }

    exec = async () => {
        console.log("Running automations");
        const now = new Date();

        if (this.automationsList.length === 0) {
            return;
        }

        this.automationsList.forEach((automation) => {
            // Check time
            const isStartTime = now.toTimeString() === automation.startTime;
            const isEndTime = automation.endTime
                ? now.toTimeString() === automation.endTime
                : false;
            if (!isStartTime) {
                return;
            }

            if (isEndTime) {
                // restore original properties
                return;
            }

            // Check if conditions are met
            if (automation.conditions) {
                let conditionsMet = false;
                automation.conditions.forEach((condition) => {
                    // Check if condition is met
                });
                if (!conditionsMet) {
                    return;
                }
            }

            // Modify device properties
            automation.devices.forEach(async (device) => {
                // Modify device properties
                const updatedDevice = {
                    ...device.device,
                    ...device.propertiesToModify,
                };
                const updateRes = await fetch(device.device.endpoint!, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedDevice),
                });

                if (updateRes.status !== 200) {
                    console.error(
                        `Error updating device with ID ${device.device.id}`,
                    );
                    console.error(updateRes);
                    return;
                }

                console.log("Updated device", updateRes);

                const res = await fetch(
                    `http://localhost:8001/devices/${device.device._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedDevice),
                    },
                );
                const data = await res.json();
                console.log("Updated device", data);
            });
        });
    };

    async run() {
        try {
            console.log("Running automation task");
            await this.exec();
            console.log("Automations ran successfully");
        } catch (error) {
            console.error("Error running automations", error);
        }
    }
}
