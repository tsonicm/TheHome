// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $automate from "./routes/automate.tsx";
import * as $index from "./routes/index.tsx";
import * as $AddDevice from "./islands/AddDevice.tsx";
import * as $AddDeviceCard from "./islands/AddDeviceCard.tsx";
import * as $Automation from "./islands/Automation.tsx";
import * as $Card from "./islands/Card.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Home from "./islands/Home.tsx";
import * as $Slider from "./islands/Slider.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/automate.tsx": $automate,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/AddDevice.tsx": $AddDevice,
    "./islands/AddDeviceCard.tsx": $AddDeviceCard,
    "./islands/Automation.tsx": $Automation,
    "./islands/Card.tsx": $Card,
    "./islands/Counter.tsx": $Counter,
    "./islands/Home.tsx": $Home,
    "./islands/Slider.tsx": $Slider,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
