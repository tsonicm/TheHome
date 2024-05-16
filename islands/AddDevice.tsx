import classNames from "classnames";

interface DeviceProps {
  id: string;
  name: string;
  brightness?: number;
  color?: string;
  on?: boolean;
  type: string;
}

interface IAddDevice {
  isHidden: boolean;
  toggleAddDevice: () => void;
}

export default function AddDevice({ isHidden, toggleAddDevice }: IAddDevice) {
  return (
    <div
      className={classNames(
        "bg-gray-500/80 absolute top-0 left-0 bottom-0 right-0 m-auto h-dvh w-dvw rounded-lg",
        { hidden: isHidden },
      )}
    >
      <div class="bg-gray-500 absolute top-0 left-0 bottom-0 right-0 m-auto h-[350px] w-[250px] rounded-lg">
        <p
          class="absolute text-sm text-white hover:text-red-600 p-2 text-center top-1 right-1"
          onClick={() => {
            const deviceName = document.getElementById("deviceName") as HTMLInputElement;
            const deviceType = document.getElementById("deviceType") as HTMLSelectElement;

            deviceName.value = "";
            deviceType.value = "colorLightBulb";

            toggleAddDevice();
          }}
        >
          X
        </p>
        <div class="flex flex-col p-4 left-0 right-0 mx-auto w-full h-full">
          <p class="text-4xl text-white p-4 text-center">Add device</p>
          <input
            class="h-[30px] w-full p-4 my-4"
            type="text"
            placeholder="Device name"
            id={"deviceName"}
          />
          <select class="h-[30px] w-full p-4" id={"deviceType"}>
            <option value="colorLightBulb">Color Light Bulb</option>
            <option value="lightBulb">Light Bulb</option>
            <option value="switch">Switch</option>
            <option value="slider">Slider</option>
          </select>
          <button
            class="bg-white outline outline-1 outline-black rounded-lg mt-4"
            onClick={() => {
            const deviceName = document.getElementById("deviceName") as HTMLInputElement;
            const deviceType = document.getElementById("deviceType") as HTMLSelectElement;
              
            if (!deviceName.value) {
                alert("Please fill out all fields");
            } else {
                console.log(deviceName.value, deviceType.value);
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
