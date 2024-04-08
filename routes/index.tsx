import { useSignal } from "@preact/signals";
import { Navbar } from "../components/Navbar.tsx";
import Card from "../islands/Card.tsx";

const name = "Light";
const count = 80
const color = "#FFDAE9";
const on = true;

export default function Home() {
  return (
    <div class="bg-slate-500 h-dvh w-dvw">
      <Card name={name} brightness={count} color={color} on={on}/>
      <Navbar currentPage="/"/>
    </div>
  );
}
