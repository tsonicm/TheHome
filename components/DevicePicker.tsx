import { JSX } from "preact";
import { useState } from "preact/hooks";
import { IDeviceProps } from "../islands/Home.tsx";

interface IDevicePickerProps extends JSX.HTMLAttributes<HTMLSelectElement> {
    devices: IDeviceProps[];
    addDevice: (device: IDeviceProps) => void;
    addedDevices: IDeviceProps[];
}

interface IDevicePropsChangeSelection {
    setNewValues: (device: IDeviceProps) => void;
    device: IDeviceProps;
}

function devicePropsChangeSelection(
    props: IDevicePropsChangeSelection | undefined,
) {
    if (!props?.device) {
        return <div></div>;
    }

    const handleDeviceChange = (property: string, value: string) => {
        const newDevice = {
            ...props.device,
            [property]: property === "percentage"
                ? parseInt(value) > 100
                    ? 100
                    : parseInt(value) < 0
                    ? 0
                    : parseInt(value)
                : property === "on"
                ? !props.device.on
                : value,
        };
        props.setNewValues(newDevice);
    };

    return (
        <div class="flex flex-col">
            <div class="flex flex-row justify-evenly mt-4 items-center">
                {props.device.color && (
                    <div class="flex flex-col items-center">
                        <input
                            type="color"
                            id="color"
                            value={props.device.color}
                            onChange={(e) =>
                                handleDeviceChange(
                                    "color" as string,
                                    (e.target as HTMLInputElement).value,
                                )}
                        />
                        <label for="deviceColor">Color</label>
                    </div>
                )}
                <div class="flex flex-col items-center">
                    <input
                        type="checkbox"
                        id="on"
                        checked={props.device.on}
                        onChange={(e) =>
                            handleDeviceChange(
                                "on" as string,
                                (e.target as HTMLInputElement).checked
                                    .toString(),
                            )}
                    />
                    <label for="deviceOn">Power</label>
                </div>
            </div>
            {props.device.percentage && (
                <>
                    <label for="devicePercentage">Percentage</label>
                    <input
                        type="number"
                        id="percentage"
                        placeholder={props.device.percentage.toString()}
                        onChange={(e) =>
                            handleDeviceChange(
                                "percentage" as string,
                                (e.target as HTMLInputElement).value,
                            )}
                        min={0}
                        max={100}
                    />
                </>
            )}
        </div>
    );
}

export default function DevicePicker(
    props: IDevicePickerProps,
) {
    const [selectedDevice, setSelectedDevice] = useState<IDeviceProps>(
        props.devices[0],
    );
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>(
        props.devices[0].id,
    );

    const handleDeviceSelection = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        setSelectedDeviceId(target.value);
        const device = props.devices.find((device) =>
            device.id === target.value
        );
        device && setSelectedDevice(device);
    };

    return (
        <>
            <select
                {...props}
                class="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
                onChange={handleDeviceSelection}
            >
                {props.devices.map((device) => (
                    <option value={device.id}>{device.name}</option>
                ))}
            </select>
            <div>
                {devicePropsChangeSelection({
                    setNewValues: setSelectedDevice,
                    device: selectedDevice,
                })}
            </div>
            <button
                class="bg-white hover:bg-gray-200 transition-colors rounded-lg mt-4 outline outline-1 outline-black"
                onClick={() => {
                    props.addDevice(selectedDevice);
                }}
            >
                Add Device
            </button>
        </>
    );
}
