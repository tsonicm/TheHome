const InitialDevices = [
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

export default InitialDevices;
