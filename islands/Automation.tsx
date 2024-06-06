import classNames from "classnames";
import { Navbar } from "../components/Navbar.tsx";
import { IDeviceProps } from "./Home.tsx";
import automations from "../utils/mock/automations.js";
import AutomationCard from "./AutomationCard.tsx";
import AddEditCard from "./AddEditCard.tsx";
import { useState } from "preact/hooks";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx";
import AutomationDetails from "./AutomationDetails.tsx";

export interface IDeviceCondition {
  device: IDeviceProps;
  property: string;
  comparison: ">" | "<" | "=" | "!=";
  value: string;
  setAndOr: boolean | null;
}

export interface IDeviceAutomationDetails {
  device: IDeviceProps;
  conditions: IDeviceCondition[] | null;
  propertiesToModify: object;
  originalProperties: object;
}

export interface IAutomation {
  name: string;
  id: string;
  devices: IDeviceAutomationDetails[];
  startTime: string;
  endTime: string;
  days: string[];
}

export default function Automation() {
  const automationsList = automations as IAutomation[];
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailsHidden, setIsDetailsHidden] = useState(true);
  const [showAddAutomation, setShowAddAutomation] = useState(false);
  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const toggleAddAutomation = () => setShowAddAutomation(!showAddAutomation);
  const [selectedAutomation, setSelectedAutomation] = useState(
    automationsList[0],
  );

  const handleDetails = (automation: IAutomation) => {
    setSelectedAutomation(automation);
    setIsDetailsHidden(false);
  };

  return (
    <div class="bg-gradient-to-bl from-slate-300 to-slate-800 h-dvh w-dvw p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-[1919px]:grid-cols-5 min-[2304px]:grid-cols-6 gap-4 pb-[80px]">
        <AddEditCard
          toggleEditDevice={toggleEditMode}
          hideAddDevice={toggleAddAutomation}
          isEditMode={isEditMode}
        />
        {automationsList.map((automation) => (
          <AutomationCard
            automation={automation}
            editMode={isEditMode}
            openDetails={handleDetails}
          />
        ))}
      </div>
      <AutomationDetails
        automation={selectedAutomation}
        isHidden={isDetailsHidden}
        hideDetails={() => setIsDetailsHidden(true)}
      />
      <Navbar currentPage="/automate" />
    </div>
  );
}
