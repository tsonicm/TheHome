import classNames from "classnames";
import { useState } from "preact/hooks";
import { IAutomation } from "./Automation.tsx";
import { IDeviceProps } from "./Home.tsx";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx";
import TimePicker from "../components/TimePicker.tsx";
import DevicePicker from "../components/DevicePicker.tsx";
import Card from "./Card.tsx";

interface IAddAutomation {
    isHidden: boolean;
    toggleAddAutomation: () => void;
    addAutomation: (automation: IAutomation) => void;
    deviceList: IDeviceProps[];
}

interface IDayPickerProps {
    days: string[];
    setDays: (days: string[]) => void;
}

function DayPicker(props: IDayPickerProps) {
    const handleDayChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
            props.setDays([...props.days, target.value]);
        } else {
            props.setDays(props.days.filter((day) => day !== target.value));
        }
    };

    return (
        <div class="flex flex-row mt-4 justify-evenly">
            <div class="flex flex-col justify-items-center">
                <input
                    type="checkbox"
                    id="monday"
                    name="monday"
                    value="Mon"
                    class="self-center"
                    onChange={handleDayChange}
                />
                <label for="monday">Mon</label>
            </div>
            <div class="flex flex-col justify-items-center">
                <input
                    type="checkbox"
                    id="tuesday"
                    name="tuesday"
                    value="Tue"
                    class="self-center"
                    onChange={handleDayChange}
                />
                <label for="tuesday">Tue</label>
            </div>
            <div class="flex flex-col justify-items-center">
                <input
                    type="checkbox"
                    id="wednesday"
                    name="wednesday"
                    value="Wed"
                    class="self-center"
                    onChange={handleDayChange}
                />
                <label for="wednesday">Wed</label>
            </div>
            <div class="flex flex-col justify-items-center">
                <input
                    type="checkbox"
                    id="thursday"
                    name="thursday"
                    value="Thu"
                    class="self-center"
                    onChange={handleDayChange}
                />
                <label for="thursday">Thu</label>
            </div>
            <div class="flex flex-col justify-items-center">
                <input
                    type="checkbox"
                    id="friday"
                    name="friday"
                    value="Fri"
                    class="self-center"
                    onChange={handleDayChange}
                />
                <label for="friday">Fri</label>
            </div>
            <div class="flex flex-col justify-items-center">
                <input
                    type="checkbox"
                    id="saturday"
                    name="saturday"
                    value="Sat"
                    class="self-center"
                    onChange={handleDayChange}
                />
                <label for="saturday">Sat</label>
            </div>
            <div class="flex flex-col justify-items-center">
                <input
                    type="checkbox"
                    id="sunday"
                    name="sunday"
                    value="Sun"
                    class="self-center"
                    onChange={handleDayChange}
                />
                <label for="sunday">Sun</label>
            </div>
        </div>
    );
}

function AddedDevices({ devices }: { devices: IDeviceProps[] }) {
    return (
        <div class="w-[350px] border-l border-black p-4 pt-5 overflow-auto">
            {devices.map((device) => (
                <Card device={device} editMode={false} editDevice={() => {}}/>
            ))}
        </div>
    )
}

export default function AddAutomation(
    { isHidden, toggleAddAutomation, addAutomation, deviceList }:
        IAddAutomation,
) {
    const [days, setDays] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [automationDevices, setAutomationDevices] = useState<IDeviceProps[]>(
        [],
    );

    const addDeviceToAutomation = (device: IDeviceProps) => {
        setAutomationDevices([...automationDevices, device]);
    };

    const handleSetStartTime = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setStartTime(target.value);
    };

    const handleSetEndTime = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setEndTime(target.value);
    };

    const handleAddAutomation = () => {
        const automationName = document.getElementById(
            "automationName",
        ) as HTMLInputElement;

        if (
            !automationName.value && !startTime && !days.length &&
            !automationDevices.length
        ) {
            alert("Please fill out all fields");
        } else {
            const automation: IAutomation = {
                id: (Math.random() * 1000).toString(36)
                    .substring(7),
                name: automationName.value,
                devices: automationDevices.map((device) => {
                    return {
                        device: deviceList.filter((initDevice) =>
                            initDevice.id === device.id
                        )[0],
                        conditions: null,
                        propertiesToModify: {
                            percentage: device.percentage,
                            color: device.color,
                            on: device.on,
                        },
                        originalProperties: null,
                    };
                }),
                startTime: new Date().setHours(
                    parseInt(startTime.split(":")[0]),
                    parseInt(startTime.split(":")[1]),
                ),
                endTime: endTime &&
                    new Date().setHours(
                        parseInt(endTime.split(":")[0]),
                        parseInt(endTime.split(":")[1]),
                    ),
                days: days,
            };
            console.log(startTime, endTime);
            console.log(automation);
            addAutomation(automation);
            toggleAddAutomation();
        }
    };

    return (
        <div
            className={classNames(
                "bg-gray-500/80 absolute top-0 left-0 bottom-0 right-0 m-auto h-dvh w-dvw backdrop-blur-sm",
                { hidden: isHidden },
            )}
        >
            <div class="bg-white/60 absolute top-0 left-0 bottom-0 right-0 m-auto h-[600px] w-[750px] rounded-lg">
                <div class="flex flex-row h-[545px] border-b border-black">
                    <div class="w-[400px] p-4">
                        <IconX
                            class="absolute text-black hover:text-red-600 cursor-pointer top-1 right-1 w-5 h-5"
                            onClick={() => {
                                const automation: IAutomation = {
                                    id: Math.random().toString(36).substring(7),
                                    name: "",
                                    devices: [],
                                    startTime: "",
                                    endTime: "",
                                    days: [],
                                };
                                console.log(automation);
                                toggleAddAutomation();
                            }}
                        />
                        <div class="flex flex-col left-0 right-0 mx-auto w-full h-full">
                            <p class="text-4xl text-black p-4 text-center">
                                New Automation
                            </p>
                            <input
                                class="h-[30px] w-full p-4 my-4"
                                type="text"
                                placeholder="Automation name"
                                id={"automationName"}
                            />
                            <div class="flex flex-row justify-evenly">
                                <TimePicker
                                    id={"startTime"}
                                    onChange={handleSetStartTime}
                                />
                                <p class="self-center">-</p>
                                <TimePicker
                                    id={"endTime"}
                                    onChange={handleSetEndTime}
                                />
                            </div>
                            <DayPicker days={days} setDays={setDays} />
                            {
                                /*Custom component for device picker here
                            Dropdown fordevice type
                            Populate fields with device props
                            Let user select which fields to use */
                            }
                            <DevicePicker
                                devices={deviceList}
                                addDevice={addDeviceToAutomation}
                                addedDevices={automationDevices}
                            />
                            {
                                /* Custom component for condition picker here
                            Dropdown for condition type (e.g. <, />, =)
                            Input for condition value
                            Validation for input type (color, number)
                            Device picker for device to apply condition to
                            Field for choosing whether condition is tied to other conditions (AND, OR, NOT)
                        */
                            }
                        </div>
                    </div>
                    <AddedDevices devices={automationDevices} />
                </div>
                <button
                    class={classNames(
                        "transition-colors rounded-lg outline outline-1 outline-black absolute bottom-4 left-0 right-0 mx-auto w-11/12",
                        {
                            "bg-gray-200": days.length === 0,
                            "bg-green-500 hover:bg-green-700 text-white":
                                days.length > 0,
                        },
                    )}
                    disabled={days.length === 0 ? true : false}
                    onClick={handleAddAutomation}
                >
                    Add Automation
                </button>
            </div>
        </div>
    );
}
