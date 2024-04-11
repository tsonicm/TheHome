import IconPower from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/power.tsx";
import { Slider } from "./Slider.tsx";
import { useState } from "preact/hooks";
import classNames from "classnames";
import { HexColorPicker } from "react-colorful";

interface CardProps {
  id: string;
  name: string;
  brightness?: number;
  color?: string;
  on?: boolean;
  type: string;
}

const colorBulbCard = (props: CardProps) => {
  const powerBtnOff = "bg-black text-white";
  const powerBtnOn = "bg-white text-black outline outline-black outline-1";

  const [color, setColor] = useState(
    props.on ? props.color ?? "#ffffff" : "#000000",
  );

  const [brightness, setBrightness] = useState(props.brightness ?? 0);

  const [power, setPower] = useState(props.on ?? false);
  
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const isColor = props.type === "colorLightBulb";

  const updateCard = () => {
    setPower(!power);
    if (power) {
      props.color = color;
      setColor("#000000");
      setOpenColorPicker(false);
    } else {
      if (isColor) setColor(props.color ?? "#ffffff");
      else setColor("#ffffff");
    }
  };

  return (
    <div class="relative">
      <div class="bg-white/60 rounded-lg shadow-md min-h-[150px] py-4 px-4 justify-between flex flex-col backdrop-blur-sm">
        <div class="flex gap-4 pb-4">
          <div
            id={`${props.id}-color`}
            class="w-16 h-16 rounded-lg flex top-0 bottom-0 my-auto drop-shadow-lg"
            style={{ backgroundColor: color }}
            onClick={() => isColor && power && setOpenColorPicker(!openColorPicker)}
          >
          </div>
          <div
            id={`${props.id}-powerBtn`}
            onClick={() => updateCard()}
            className={classNames(
              "cursor-pointer w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto",
              power ? powerBtnOn : powerBtnOff,
            )}
          >
            <IconPower class="w-12 h-12 m-auto" />
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-2xl">{props.name}</p>
            <p id={`${props.id}-brightness`} class="text-lg">
              {power
                ? brightness !== 0 ? `Brightness: ${brightness}` : "Off"
                : "Off"}
            </p>
          </div>
        </div>
        <Slider startValue={brightness} sliderValueChange={setBrightness} />
      </div>
      {openColorPicker && (
        <div class="absolute top-4 left-[95px] z-50 bg-white/60 rounded-lg shadow-md min-h-[150px] w-fit py-4 px-4 justify-evenly flex flex-col backdrop-blur-sm">
          <HexColorPicker color={color} onChange={setColor}/>
          <button class="bg-white outline outline-1 outline-black rounded-lg mt-4" onClick={() => setOpenColorPicker(false)}>
            Set Color
          </button>
        </div>
      )}
    </div>
  );
};

const switchCard = (props: CardProps) => {
  const powerBtnOff = "bg-black text-white";
  const powerBtnOn = "bg-white text-black outline outline-black outline-1";
  
  const [power, setPower] = useState(props.on ?? false);

  return (
    <div class="bg-white/60 rounded-lg shadow-md min-h-[150px] py-4 justify-between flex flex-row backdrop-blur-sm">
      <div class="flex gap-4 px-4 flex-row justify-center align-middle w-full">
        <div
          id={`${props.id}-powerBtn`}
          onClick={() => setPower(!power)}
          className={classNames(
            "cursor-pointer w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto",
            power ? powerBtnOn : powerBtnOff,
          )}
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
  const [brightness, setBrightness] = useState(props.brightness ?? 0);

  return (
    <div class="bg-white/60 rounded-lg shadow-md min-w-fit min-h-[150px] py-4 px-4 justify-evenly flex flex-col backdrop-blur-sm">
      <div class="flex gap-4">
        <div class="gap-2">
          <p class="text-2xl">{props.name}</p>
        </div>
      </div>
      <Slider startValue={brightness} sliderValueChange={setBrightness} />
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
