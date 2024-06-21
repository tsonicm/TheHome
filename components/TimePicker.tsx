import { JSX } from "preact/";

interface ITimePickerProps extends JSX.HTMLAttributes<HTMLInputElement> {
    onChange?: (e: Event) => void;
}

export default function TimePicker(
    props: ITimePickerProps,
) {
    return (
        <input
            {...props}
            type="time"
            class="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
            id={props.id}
            onChange={props.onChange}
        />
    );
}
