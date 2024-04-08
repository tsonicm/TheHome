import { Signal } from "@preact/signals";
import IconPower from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/power.tsx"
import { Button } from "../components/Button.tsx";

interface CardProps {
    name: string;
    brightness: number;
    color: string;
    on: boolean;
}

export default function Card(props: CardProps) {
    return (
        <div class="flex gap-4 p-4 bg-white rounded-lg shadow-md w-[350px]">
            <div class="w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto" style={{backgroundColor: props.color}}></div>
            <a onClick = {() => props.on = !props.on} class="hover:cursor-pointer">
                <div className={`w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto ${props.on ? 'bg-white outline outline-1 outline-black' : 'bg-black text-white'}`}>
                    <IconPower class="w-12 h-12 m-auto"/>
                </div>
            </a>
            <div class="flex flex-col gap-2">
                <p class="text-2xl">{props.name}</p>
                <p class="text-lg">{
                    props.on ? `Brightness: ${props.brightness}` : 'Off'
                }</p>
            </div>
        </div>
    );
}