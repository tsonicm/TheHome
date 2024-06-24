import { ObjectId } from "https://deno.land/x/atlas_sdk/mod.ts";

export default interface IDevice {
    _id: ObjectId;
    id: string;
    name: string;
    type: string;
    percentage?: number;
    color?: string;
    on?: boolean;
    endpoint?: string;
}
