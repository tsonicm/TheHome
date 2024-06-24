import IDeviceProps from "./device.ts";

export interface IDeviceCondition {
    id: number;
    device: IDeviceProps;
    property: string;
    comparison: string;
    value: string;
    setAndOr: "AND" | "OR" | null;
}

export interface IDeviceAutomationDetails {
    device: IDeviceProps;
    propertiesToModify: object;
    originalProperties: object | null;
}

export interface IAutomation {
    name: string;
    id: string;
    devices: IDeviceAutomationDetails[];
    conditions: IDeviceCondition[] | null;
    startTime: string | number;
    endTime?: string | number;
    days: string[];
}
