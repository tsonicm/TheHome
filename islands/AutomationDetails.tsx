import classNames from "classnames";
import { IAutomation, IDeviceCondition } from "./Automation.tsx";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx";

interface IAutomationDetails {
  automation: IAutomation;
  isHidden: boolean;
  hideDetails: () => void;
}

function DeviceConditions(conditions: IDeviceCondition[] | null) {
  if (!conditions) {
    return null;
  }
  return conditions?.map((condition) => (
    <p class="text-sm">
      {condition.device.name} {condition.comparison} {condition.value}
    </p>
  ));
}

export default function AutomationDetails(
  props: IAutomationDetails,
) {
  return (
    <div
      className={classNames(
        "bg-gray-500/80 absolute top-0 left-0 bottom-0 right-0 m-auto h-dvh w-dvw rounded-lg backdrop-blur-sm",
        { hidden: props.isHidden },
      )}
    >
      <div class="bg-white/60 absolute top-0 left-0 bottom-0 right-0 m-auto h-[500px] w-[800px] rounded-lg">
        <IconX
          class="absolute text-black hover:text-red-600 cursor-pointer top-1 right-1 w-5 h-5"
          onClick={() => {
            props.hideDetails();
          }}
        />
        <div class="flex flex-col p-4 left-0 right-0 mx-auto w-full h-full">
          <p class="text-4xl text-black p-4 text-center">
            {props.automation.name}
          </p>
          <div class="flex flex-row justify-evenly gap-2">
            <p class="text-2xl">
              {new Date(props.automation.startTime).toLocaleTimeString(
                "en-US",
                { hour: "2-digit", minute: "2-digit", hour12: false },
              )}
              {" - "}
              {props.automation.endTime &&
                new Date(props.automation.endTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
            </p>
            <p class="text-2xl">{props.automation.days.join(", ")}</p>
          </div>
          <p class="text-2xl">Devices</p>
          <hr class="border-1 border-black py-4" />
          <div class="flex flex-row gap-2">
            {props.automation.devices.map((device) => (
              <div class="flex flex-col gap-2 border-2 border-black rounded-md p-4">
                <p class="text-lg">{device.device.name}</p>
                {device.propertiesToModify && (
                  <div class="flex flex-col gap-2">
                    <p class="text-sm text-center">- State -</p>
                    <div class="flex flex-col gap-2">
                      {Object.entries(device.propertiesToModify).map(
                        ([key, value]) => (
                          <p class="text-sm">
                            {key}: {value.toString()}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                )}
                {device.conditions && (
                  <div class="flex flex-col gap-2">
                    <p class="text-sm text-center">- Conditions -</p>
                    {DeviceConditions(device.conditions)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
