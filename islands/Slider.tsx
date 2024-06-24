import { useState } from "preact/hooks";

interface props {
    startValue: number;
    sliderValueChange?: (value: number) => void;
}

export function Slider({ startValue, sliderValueChange }: props) {
    const [value, setValue] = useState(startValue);

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setValue(parseInt(target.value));
        sliderValueChange && sliderValueChange(parseInt(target.value));
    };

    return (
        <div class="relative flex h-[32px] w-full bg-black left-0 right-0 mx-auto rounded-lg outline outline-4">
            <div
                class="absolute h-[32px] bg-white rounded-lg"
                style={{ width: `${value}%` }}
            >
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onInput={handleChange}
            />
        </div>
    );
}
