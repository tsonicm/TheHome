import { useState } from "preact/hooks";
import { Navbar } from "../components/Navbar.tsx";
import AddDevice from "./AddDevice.tsx";
import AddEditCard from "./AddEditCard.tsx";
import Card from "./Card.tsx";
import InitialDevices from "../utils/mock/devices.js";
import { getDevices } from "../routes/api/getDevices.ts";

export interface IDeviceProps {
  id: string;
  name: string;
  type: string;
  percentage?: number;
  color?: string;
  on?: boolean;
  remove?: boolean;
  endpoint?: string;
}

export default function Home() {
  const [isHidden, setIsHidden] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [Devices, setDevices] = useState(InitialDevices as IDeviceProps[]);

  const toggleAddDevice = () => setIsHidden(!isHidden);
  const toggleEditDevice = () => setIsEditMode(!isEditMode);

  const editDevice = (device: IDeviceProps) => {
    if (device.remove) {
      setDevices(Devices.filter((el) => el.id !== device.id));
    } else {
      setDevices(
        Devices.map((el) => {
          if (el.id === device.id) {
            return device;
          }
          return el;
        }),
      );
    }
  };

  const addDevice = (device: IDeviceProps) => {
    Devices.push(device);
  };

  return (
    <div class="bg-gradient-to-tr from-slate-300 to-slate-800 h-dvh w-dvw p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-[1919px]:grid-cols-5 min-[2304px]:grid-cols-6 gap-4 pb-[80px]">
        <AddEditCard
          hideAddDevice={toggleAddDevice}
          toggleEditDevice={toggleEditDevice}
          isEditMode={isEditMode}
        />
        {Devices.map((element) => {
          return (
            <Card
              device={element}
              editMode={isEditMode}
              removeDevice={editDevice}
            />
          );
        })}
      </div>
      <AddDevice
        isHidden={isHidden}
        toggleAddDevice={toggleAddDevice}
        addDevice={addDevice}
      />
      <Navbar currentPage="/" />
    </div>
  );
}
