import IconPower from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/power.tsx";
import { Slider } from "./Slider.tsx";

interface CardProps {
  id: string;
  name: string;
  brightness?: number;
  color?: string;
  on?: boolean;
  type: string;
}

const colorBulbCard = (props: CardProps) => {
  const powerBtnClassesOff =
    "cursor-pointer w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto bg-black text-white";
  const powerBtnClasses =
    "cursor-pointer w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto bg-white text-black outline outline-black outline-1";
  const updateCard = () => {
    if (props) {
      props.on = !props.on;
    }
    const powerBtn = document.getElementById(`${props.id}-powerBtn`);
    const brightness = document.getElementById(`${props.id}-brightness`);
    const color = document.getElementById(`${props.id}-color`);
    if (props.on) {
      powerBtn!.classList.value = powerBtnClasses;
      brightness!.innerText = `Brightness: ${props.brightness}`;
      color!.style.backgroundColor = props.color ?? "white"
    } else {
      powerBtn!.classList.value = powerBtnClassesOff;
      brightness!.innerText = `Off`;
      color!.style.backgroundColor = "black";
    }
  };

    const handleChange = (value: number) => {
        props.brightness = value;
        if (props.on) {
            const brightness = document.getElementById(`${props.id}-brightness`);
            brightness!.innerText = `Brightness: ${value}`;
        }
    }

  return (
    <div class="bg-white/60 rounded-lg shadow-md min-w-[350px] h-[150px] py-4 justify-between flex flex-col backdrop-blur-sm">
      <div class="flex gap-4 px-4">
        <div
          id={`${props.id}-color`}
          class="w-16 h-16 rounded-lg flex top-0 bottom-0 my-auto drop-shadow-lg"
          style={props.on
            ? props.type === "colorLightBulb"
                ? { backgroundColor: props.color }
                : { backgroundColor: "white" }
            : { backgroundColor: "black" }}
        >
        </div>
        <div
          id={`${props.id}-powerBtn`}
          onClick={() => updateCard()}
          className={props.on ? powerBtnClasses : powerBtnClassesOff}
        >
          <IconPower class="w-12 h-12 m-auto" />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-2xl">{props.name}</p>
          <p id={`${props.id}-brightness`} class="text-lg">
            {props.on ? `Brightness: ${props.brightness}` : `Off`}
          </p>
        </div>
      </div>
        <Slider startValue={props.brightness ?? 0} sliderValueChange={handleChange} />
    </div>
  );
};

const switchCard = (props: CardProps) => {
    const powerBtnClassesOff =
    "cursor-pointer w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto bg-black text-white";
  const powerBtnClasses =
    "cursor-pointer w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto bg-white text-black outline outline-black outline-1";
  const updateCard = () => {
    if (props) {
      props.on = !props.on;
    }
    const powerBtn = document.getElementById(`${props.id}-powerBtn`);
    if (props.on) {
      powerBtn!.classList.value = powerBtnClasses;
    } else {
      powerBtn!.classList.value = powerBtnClassesOff;
    }
  };

  return (
    <div class="bg-white/60 rounded-lg shadow-md min-w-[350px] h-[150px] py-4 justify-between flex flex-row backdrop-blur-sm">
      <div class="flex gap-4 px-4 flex-row justify-center align-middle w-full">

        <div
          id={`${props.id}-powerBtn`}
          onClick={() => updateCard()}
          className={props.on ? powerBtnClasses : powerBtnClassesOff}
        >
          <IconPower class="w-12 h-12 m-auto" />
        </div>
        <div class="gap-2 top-0 bottom-0 my-auto">
          <p class="text-2xl">{props.name}</p>
        </div>

      </div>
    </div>
  );
};

const sliderCard = (props: CardProps) => {

    const handleChange = (value: number) => {
        props.brightness = value;
    }

    return (
    <div class="bg-white/60 rounded-lg shadow-md min-w-[350px] h-[150px] py-4 justify-evenly flex flex-col backdrop-blur-sm">
        <div class="flex gap-4 px-4">
        <div class="gap-2">
            <p class="text-2xl">{props.name}</p>
        </div>
        </div>
        <Slider startValue={props.brightness ?? 0} sliderValueChange={handleChange} />
    </div>
    );
};

export default function Card(props: CardProps) {
  switch (props.type.toString()) {
    case "colorLightBulb":
      return colorBulbCard(props);
    case "lightBulb":
      return colorBulbCard(props);
    case "switch":
        return switchCard(props);
    case "slider":
        return sliderCard(props);
    default:
      return <div>Invalid card type</div>;
  }
}
