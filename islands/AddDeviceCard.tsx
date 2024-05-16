interface IAddDeviceCard {
  hideAddDevice: () => void;
}

export default function AddDeviceCard({ hideAddDevice }: IAddDeviceCard) {
  return (
    <a onClick={hideAddDevice} class="cursor-pointer">
      <div class="bg-white/60 rounded-lg shadow-md min-w-fit min-h-[150px] py-4 px-4 justify-evenly flex flex-col backdrop-blur-sm">
        <div class="flex gap-4">
          <p class="text-7xl left-0 right-0 mx-auto">+</p>
        </div>
      </div>
    </a>
  );
}
