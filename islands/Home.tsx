import { useState } from "preact/hooks";
import { Navbar } from "../components/Navbar.tsx";
import AddDevice from "./AddDevice.tsx";
import AddDeviceCard from "./AddDeviceCard.tsx";
import Card from "./Card.tsx";

export interface IDeviceProps {
  id: string;
  name: string;
  percentage?: number;
  color?: string;
  on?: boolean;
  type: string;
  field1?: {
    name: string;
    value: string;
  };
  field2?: {
    name: string;
    value: string;
  };
  field3?: {
    name: string;
    value: string;
  };
  remove?: boolean;
}

export default function Home() {
  const InitialDevices: IDeviceProps[] = [
    {
      type: "colorLightBulb",
      id: "1",
      name: "Bedroom",
      percentage: 5,
      color: "#FFDAE9",
      on: true,
    },
    {
      type: "colorLightBulb",
      id: "2",
      name: "Living Room",
      percentage: 80,
      color: "#DFEAFF",
      on: true,
    },
    { type: "switch", id: "8", name: "Basement", on: false },
    {
      type: "colorLightBulb",
      id: "3",
      name: "Kitchen",
      percentage: 50,
      color: "#FFF",
      on: false,
    },
    { type: "lightBulb", id: "4", name: "Bathroom", percentage: 100, on: true },
    { type: "lightBulb", id: "5", name: "Porch", percentage: 20, on: false },
    { type: "switch", id: "7", name: "Backyard Switch", on: true },
    { type: "slider", id: "9", name: "Office Blinds", percentage: 60 },
    {
      type: "colorLightBulb",
      id: "6",
      name: "Garage",
      percentage: 100,
      color: "purple",
      on: true,
    },
  ];

  const [isHidden, setIsHidden] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [Devices, setDevices] = useState(InitialDevices);

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
        <AddDeviceCard
          hideAddDevice={toggleAddDevice}
          toggleEditDevice={toggleEditDevice}
        />
        {Devices.map((element) => {
          return (
            <Card
              device={element}
              editMode={isEditMode}
              editDevice={editDevice}
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
