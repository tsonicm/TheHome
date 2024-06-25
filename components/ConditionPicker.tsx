import { useState } from "preact/hooks";
import { IDeviceProps } from "../islands/Home.tsx";
import { IDeviceCondition } from "../islands/Automation.tsx";

enum Comparison {
    GT = ">",
    LT = "<",
    EQ = "=",
    NEQ = "=/=",
}

enum ReplacementWords {
    percentage = "percentage",
    on = "power",
    color = "color",
}

enum Linker {
    AND = "AND",
    OR = "OR",
}

interface IConditionPickerProps {
    devices: IDeviceProps[];
    addConditions: (conditions: IDeviceCondition[]) => void;
}

const propertiesToFilterOut = ["id", "name", "type"];

const ConditionValuePicker = (
    selectedProperty: string,
    setSelectedValue: (e: Event) => void,
) => {
    switch (selectedProperty) {
        case "percentage":
            return (
                <input
                    type="number"
                    class="px-2 py-1 w-[70px] border-gray-500 border-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
                    defaultValue="0"
                    onChange={setSelectedValue}
                />
            );
        case "on":
            return (
                <select
                    class="px-2 py-1 w-[70px] border-gray-500 border-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
                    onChange={setSelectedValue}
                    defaultValue={"true"}
                >
                    <option value="true">On</option>
                    <option value="false">Off</option>
                </select>
            );
        case "color":
            return (
                <input
                    type="color"
                    class="px-2 py-1 w-[70px] h-9 border-gray-500 border-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
                    onChange={setSelectedValue}
                    defaultValue={"#000000"}
                />
            );
        default:
            return (
                <input
                    type="text"
                    class="px-2 py-1 border-gray-500 border-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
                    onChange={setSelectedValue}
                    defaultValue=""
                />
            );
    }
};

export default function ConditionPicker(props: IConditionPickerProps) {
    const [conditionList, setConditionList] = useState<IDeviceCondition[]>([]);

    const handleSetConditions = () => {
        props.addConditions(conditionList.map((condition, index) => ({
            ...condition,
            setAndOr: index === conditionList.length - 1
                ? null
                : condition.setAndOr,
        })));
    };

    const handleAddCondition = () => {
        const initialDevice = props.devices[0];
        setConditionList([
            ...conditionList,
            {
                id: conditionList.length + 1,
                device: initialDevice,
                property: Object.keys(initialDevice).filter((property) =>
                    !propertiesToFilterOut.includes(property)
                )[0],
                comparison: Comparison.EQ,
                value: "",
                setAndOr: "AND",
            },
        ]);
        handleSetConditions();
    };

    const handleDeviceSelection = (e: Event, conditionId: number) => {
        const target = e.target as HTMLSelectElement;
        const newDevice = props.devices.find(
            (device) => device.id === target.value,
        );
        if (newDevice) {
            setConditionList(
                conditionList.map((condition) =>
                    condition.id === conditionId
                        ? {
                            ...condition,
                            device: newDevice,
                            property:
                                Object.keys(newDevice).filter((property) =>
                                    !propertiesToFilterOut.includes(property)
                                )[0],
                        }
                        : condition
                ),
            );
        }
        handleSetConditions();
    };

    const handlePropertySelection = (e: Event, conditionId: number) => {
        const target = e.target as HTMLSelectElement;
        const property = target.value;
        setConditionList(
            conditionList.map((condition) => (
                condition.id === conditionId
                    ? {
                        ...condition,
                        property: property,
                    }
                    : condition
            )),
        );
        handleSetConditions();
    };

    const setSelectedValue = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setConditionList(
            conditionList.map((condition) => (
                condition.id === parseInt(target.id)
                    ? {
                        ...condition,
                        value: value.toString(),
                    }
                    : condition
            )),
        );
        handleSetConditions();
    };

    const filterConditions = (property: string) => {
        switch (property) {
            case "percentage":
                return [
                    Comparison.GT,
                    Comparison.LT,
                    Comparison.EQ,
                    Comparison.NEQ,
                ];
            case "on":
                return [Comparison.EQ];
            case "color":
                return [Comparison.EQ, Comparison.NEQ];
            default:
                return [Comparison.EQ, Comparison.NEQ];
        }
    };

    return (
        <div class="relative max-h-[220px] h-full w-full">
            <div class="max-h-[190px] overflow-auto">
                {conditionList.map((condition, index) => (
                    <div class="flex flex-row my-1 space-x-4">
                        {/* Device */}
                        <select
                            class="px-2 py-1 border-gray-500 border-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
                            onChange={(e) =>
                                handleDeviceSelection(e, index + 1)}
                        >
                            {props.devices.map((device) => (
                                <option value={device.id}>{device.name}</option>
                            ))}
                        </select>
                        {/* Property */}
                        <select
                            class="px-2 py-1 w-32 border-gray-500 border-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
                            onChange={(e) =>
                                handlePropertySelection(e, index + 1)}
                        >
                            {Object.keys(condition.device).map((property) => (
                                !propertiesToFilterOut.includes(property) && (
                                    <option
                                        value={property}
                                    >
                                        {ReplacementWords[
                                            property as keyof typeof ReplacementWords
                                        ]}
                                    </option>
                                )
                            ))}
                        </select>
                        {/* Condition */}
                        <select class="px-2 py-1 w-16 border-gray-500 border-2 rounded-lg bg-white hover:bg-gray-200 transition-colors">
                            {filterConditions(condition.property).map((
                                currentCondition,
                            ) => (
                                <option value={currentCondition}>
                                    {currentCondition}
                                </option>
                            ))}
                        </select>
                        {/* Value */}
                        {ConditionValuePicker(
                            condition.property,
                            setSelectedValue,
                        )}
                        {/* Linker */}
                        {index !== conditionList.length - 1 && (
                            <select
                                class="px-2 py-1 border-gray-500 border-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
                                onChange={(e) => {
                                    const target = e
                                        .target as HTMLSelectElement;
                                    const linker = target.value as Linker;
                                    setConditionList(
                                        conditionList.map((condition) =>
                                            condition.id === index + 1
                                                ? {
                                                    ...condition,
                                                    setAndOr: linker,
                                                }
                                                : condition
                                        ),
                                    );
                                }}
                            >
                                {Object.values(Linker).map((linker) => (
                                    <option value={linker}>{linker}</option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
            </div>
            <div class="absolute bottom-0 w-full">
                <button
                    class="w-full bg-white hover:bg-gray-200 transition-colors rounded-lg mt-4 outline outline-1 outline-black"
                    onClick={handleAddCondition}
                >
                    Add Condition
                </button>
            </div>
        </div>
    );
}
