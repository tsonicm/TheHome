const automations = [{
  name: "Do Stuff",
  id: "1",
  devices: [
    {
      device: {
        type: "colorLightBulb",
        id: "1",
        name: "Bedroom",
        percentage: 5,
        color: "#FFDAE9",
        on: true,
      },
      propertiesToModify: {
        percentage: 100,
        color: "#CA95BF",
        on: true,
      },
      originalProperties: {},
    },
    {
      device: {
        type: "switch",
        id: "8",
        name: "Basement",
        on: false,
      },
      conditions: [{
        device: {
          type: "slider",
          id: "9",
          name: "Office Blinds",
          percentage: 60,
        },
        property: "percentage",
        comparison: "<",
        value: 70,
        setAndOr: null,
      }],
      propertiesToModify: {
        on: true,
      },
      originalProperties: {},
    },
  ],
  startTime: "2020-07-01T09:00:00Z",
  endTime: "2020-07-01T10:00:00Z",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
}, {
  name: "Morning Routine",
  id: "2",
  devices: [
    {
      device: {
        type: "colorLightBulb",
        id: "3",
        name: "Kitchen",
        percentage: 50,
        color: "#FFF",
        on: false,
      },
      propertiesToModify: {
        on: true,
        percentage: 100,
      },
      originalProperties: {},
    },
  ],
  startTime: "2020-07-01T03:00:00Z",
  endTime: "2020-07-01T03:30:00Z",
  days: ["Mon", "Wed", "Fri"],
}];

export default automations;
