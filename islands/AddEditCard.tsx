import IconEdit from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/edit.tsx";
import IconEditOff from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/edit-off.tsx";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/plus.tsx";

interface IAddEditCard {
  hideAddDevice: () => void;
  toggleEditDevice: () => void;
  isEditMode: boolean;
}

export default function AddEditCard(
  { hideAddDevice, toggleEditDevice, isEditMode }: IAddEditCard,
) {
  return (
    <div class="flex flex-row min-w-full justify-between w-auto">
      <a onClick={hideAddDevice} class="cursor-pointer w-[calc(50%-8px)]">
        <div class="bg-white/60 rounded-lg min-w-fit min-h-[150px] py-4 px-4 justify-evenly flex flex-col hover:bg-white">
          <div class="flex justify-center gap-4">
            <IconPlus class="w-16 h-16 " />
          </div>
        </div>
      </a>
      <a onClick={toggleEditDevice} class="cursor-pointer w-[calc(50%-8px)]">
        <div class="bg-white/60 rounded-lg min-w-fit min-h-[150px] py-4 px-4 justify-evenly flex flex-col hover:bg-white">
          <div class="flex justify-center gap-4">
            {isEditMode
              ? <IconEditOff class="w-16 h-16 " />
              : <IconEdit class="w-16 h-16 " />}
          </div>
        </div>
      </a>
    </div>
  );
}
