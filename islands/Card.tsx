import IconPower from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/power.tsx";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx";
import { Slider } from "./Slider.tsx";
import { useState } from "preact/hooks";
import classNames from "classnames";
import { HexColorPicker } from "react-colorful";
import { IDeviceProps } from "./Home.tsx";

interface CardProps {
  device: IDeviceProps;
  editMode: boolean;
  editDevice: (device: IDeviceProps) => void;
}

const colorBulbCard = (props: CardProps) => {
  const powerBtnOff = "bg-black text-white";
  const powerBtnOn = "bg-white text-black outline outline-black outline-1";

  const [color, setColor] = useState(
    props.device.on ? props.device.color ?? "#ffffff" : "#000000",
  );

  const [brightness, setBrightness] = useState(props.device.percentage ?? 0);

  const [power, setPower] = useState(props.device.on ?? false);

  const [openColorPicker, setOpenColorPicker] = useState(false);

  const isColor = props.device.type === "colorLightBulb";

  const updateCard = () => {
    setPower(!power);
    if (power) {
      props.device.color = color;
      setColor("#000000");
      setOpenColorPicker(false);
    } else {
      if (isColor) setColor(props.device.color ?? "#ffffff");
      else setColor("#ffffff");
    }
  };

  return (
    <div class="relative">
      <div class="bg-white/60 rounded-lg shadow-md min-h-[150px] py-4 px-4 justify-between flex flex-col backdrop-blur-sm">
        <div
          className={classNames("absolute top-2 right-2", {
            hidden: !props.editMode,
          })}
        >
          <IconX
            class="w-7 h-7 text-red-600 hover:text-red-800 cursor-pointer"
            onClick={() => {
              props.device.remove = true;
              props.editDevice(props.device);
            }}
          />
        </div>
        <div class="flex gap-4 pb-4">
          <div
            id={`${props.device.id}-color`}
            class={classNames(
              "w-16 h-16 rounded-lg flex top-0 bottom-0 my-auto drop-shadow-lg",
              {
                "cursor-pointer": props.device.type === "colorLightBulb" &&
                  power,
              },
            )}
            style={{ backgroundColor: color }}
            onClick={() =>
              isColor && power && setOpenColorPicker(!openColorPicker)}
          >
          </div>
          <div
            id={`${props.device.id}-powerBtn`}
            onClick={() => updateCard()}
            className={classNames(
              "cursor-pointer w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto",
              power ? powerBtnOn : powerBtnOff,
            )}
          >
            <IconPower class="w-12 h-12 m-auto" />
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-2xl">{props.device.name}</p>
            <p id={`${props.device.id}-brightness`} class="text-lg">
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
          <HexColorPicker color={color} onChange={setColor} />
          <button
            class="bg-white outline outline-1 outline-black rounded-lg mt-4"
            onClick={() => setOpenColorPicker(false)}
          >
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

  const [power, setPower] = useState(props.device.on ?? false);

  return (
    <div class="bg-white/60 rounded-lg shadow-md min-h-[150px] py-4 justify-between flex flex-row backdrop-blur-sm">
      <div
        className={classNames("absolute top-2 right-2", {
          hidden: !props.editMode,
        })}
      >
        <IconX
          class="w-7 h-7 text-red-600 hover:text-red-800 cursor-pointer"
          onClick={() => {
            props.device.remove = true;
            props.editDevice(props.device);
          }}
        />
      </div>
      <div class="flex gap-4 px-4 flex-row justify-center align-middle w-full">
        <div
          id={`${props.device.id}-powerBtn`}
          onClick={() => setPower(!power)}
          className={classNames(
            "cursor-pointer w-16 h-16 rounded-lg align-center flex top-0 bottom-0 my-auto",
            power ? powerBtnOn : powerBtnOff,
          )}
        >
          <IconPower class="w-12 h-12 m-auto" />
        </div>
        <div class="gap-2 top-0 bottom-0 my-auto">
          <p class="text-2xl">{props.device.name}</p>
        </div>
      </div>
    </div>
  );
};

const sliderCard = (props: CardProps) => {
  const [brightness, setBrightness] = useState(props.device.percentage ?? 0);

  return (
    <div class="bg-white/60 rounded-lg shadow-md min-w-fit min-h-[150px] py-4 px-4 justify-evenly flex flex-col backdrop-blur-sm">
      <div
        className={classNames("absolute top-2 right-2", {
          hidden: !props.editMode,
        })}
      >
        <IconX
          class="w-7 h-7 text-red-600 hover:text-red-800 cursor-pointer"
          onClick={() => {
            props.device.remove = true;
            props.editDevice(props.device);
          }}
        />
      </div>
      <div class="flex gap-4">
        <div class="gap-2">
          <p class="text-2xl">{props.device.name}</p>
        </div>
      </div>
      <Slider startValue={brightness} sliderValueChange={setBrightness} />
    </div>
  );
};

const otherCard = (props: CardProps) => {
  return (
    <div class="bg-white/60 rounded-lg shadow-md min-w-fit min-h-[150px] py-4 px-4 justify-evenly flex flex-col backdrop-blur-sm">
      <div
        className={classNames("absolute top-2 right-2", {
          hidden: !props.editMode,
        })}
      >
        <IconX
          class="w-7 h-7 text-red-600 hover:text-red-800 cursor-pointer"
          onClick={() => {
            props.device.remove = true;
            props.editDevice(props.device);
          }}
        />
      </div>
      <div class="flex gap-4">
        <div class="gap-2">
          <p class="text-2xl">{props.device.name}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <p>{props.device.field1?.name}: {props.device.field1?.value}</p>
        <p>{props.device.field2?.name}: {props.device.field2?.value}</p>
        <p>{props.device.field3?.name}: {props.device.field3?.value}</p>
      </div>
    </div>
  );
};

export default function Card(props: CardProps) {
  switch (props.device.type.toString()) {
    case "colorLightBulb":
      return colorBulbCard(props);
    case "lightBulb":
      return colorBulbCard(props);
    case "switch":
      return switchCard(props);
    case "slider":
      return sliderCard(props);
    case "other":
      return otherCard(props);
    default:
      return <div>Invalid card type</div>;
  }
}
