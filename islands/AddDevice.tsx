import classNames from "classnames";
import { IDeviceProps } from "./Home.tsx";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx";

interface IAddDevice {
  isHidden: boolean;
  toggleAddDevice: () => void;
  addDevice: (device: IDeviceProps) => void;
}

export default function AddDevice(
  { isHidden, toggleAddDevice, addDevice }: IAddDevice,
) {
  return (
    <div
      className={classNames(
        "bg-gray-500/80 absolute top-0 left-0 bottom-0 right-0 m-auto h-dvh w-dvw rounded-lg backdrop-blur-sm",
        { hidden: isHidden },
      )}
    >
      <div class="bg-white/60 absolute top-0 left-0 bottom-0 right-0 m-auto h-[350px] w-[250px] rounded-lg">
        <IconX
          class="absolute text-black hover:text-red-600 cursor-pointer top-1 right-1 w-5 h-5"
          onClick={() => {
            const deviceName = document.getElementById(
              "deviceName",
            ) as HTMLInputElement;
            const deviceType = document.getElementById(
              "deviceType",
            ) as HTMLSelectElement;

            deviceName.value = "";
            deviceType.value = "colorLightBulb";

            toggleAddDevice();
          }}
        />
        <div class="flex flex-col p-4 left-0 right-0 mx-auto w-full h-full">
          <p class="text-4xl text-black p-4 text-center">Add device</p>
          <input
            class="h-[30px] w-full p-4 my-4"
            type="text"
            placeholder="Device name"
            id={"deviceName"}
          />
          <select
            class="h-[30px] w-full p-4"
            id={"deviceType"}
          >
            <option value="colorLightBulb">Color Light Bulb</option>
            <option value="lightBulb">Light Bulb</option>
            <option value="switch">Switch</option>
            <option value="slider">Slider</option>
            <option value="other">Other</option>
          </select>
          <button
            class="bg-white outline outline-1 outline-black rounded-lg mt-4"
            onClick={() => {
              const deviceName = document.getElementById(
                "deviceName",
              ) as HTMLInputElement;
              const deviceType = document.getElementById(
                "deviceType",
              ) as HTMLSelectElement;

              if (!deviceName.value) {
                alert("Please fill out all fields");
              } else {
                addDevice({
                  id: Math.random().toString(36).substring(7),
                  name: deviceName.value,
                  type: deviceType.value,
                  percentage: deviceType.value === "switch" ||
                      deviceType.value === "other"
                    ? undefined
                    : 50,
                  color: deviceType.value === "colorLightBulb"
                    ? "#fff1e0"
                    : undefined,
                  on: true,
                });
                deviceName.value = "";
                deviceType.value = "colorLightBulb";
                toggleAddDevice();
              }
            }}
          >
            Add Device
          </button>
        </div>
      </div>
    </div>
  );
}
