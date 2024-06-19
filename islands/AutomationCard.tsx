import classNames from "classnames";
import { IAutomation } from "./Automation.tsx";
import { useState } from "preact/hooks";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx";
import IconInfoCircle from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/info-circle.tsx";

interface IAutomationCard {
  automation: IAutomation;
  editMode: boolean;
  openDetails: (automation: IAutomation) => void;
}

export default function AutomationCard(
  props: IAutomationCard,
) {
  return (
    <div class="bg-white/60 rounded-lg p-4 w-full h-[150px] relative backdrop-blur-sm shadow-md">
      <div
        className={classNames("absolute top-2 right-2", {
          hidden: !props.editMode,
        })}
      >
        <IconX
          class="w-7 h-7 text-red-600 hover:text-red-800 cursor-pointer"
          onClick={() => {
            console.log("Remove automation");
          }}
        />
      </div>
      <div className="absolute top-2 left-2">
        <IconInfoCircle
          class="w-7 h-7 text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => props.openDetails(props.automation)}
        />
      </div>
      <p class="text-4xl text-black pb-4 text-center">
        {props.automation.name}
      </p>
      <div class="flex text-center flex-col gap-2">
        <p>
          {new Date(props.automation.startTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })} - {props.automation.endTime &&
            new Date(props.automation.endTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
        </p>
        <p class="text-lg">{props.automation.days.join(", ")}</p>
      </div>
    </div>
  );
}
