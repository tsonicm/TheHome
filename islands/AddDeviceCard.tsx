interface IAddDeviceCard {
  hideAddDevice: () => void;
  toggleEditDevice: () => void;
}

export default function AddDeviceCard(
  { hideAddDevice, toggleEditDevice }: IAddDeviceCard,
) {
  return (
    <div class="flex flex-row min-w-full justify-between w-auto">
      <a onClick={hideAddDevice} class="cursor-pointer w-[calc(50%-8px)]">
        <div class="bg-white/60 rounded-lg min-w-fit min-h-[150px] py-4 px-4 justify-evenly flex flex-col hover:bg-white">
          <div class="flex gap-4">
            <p class="text-7xl left-0 right-0 mx-auto">+</p>
          </div>
        </div>
      </a>
      <a onClick={toggleEditDevice} class="cursor-pointer w-[calc(50%-8px)]">
        <div class="bg-white/60 rounded-lg min-w-fit min-h-[150px] py-4 px-4 justify-evenly flex flex-col hover:bg-white">
          <div class="flex gap-4">
            <p class="text-4xl left-0 right-0 mx-auto">Edit</p>
          </div>
        </div>
      </a>
    </div>
  );
}
