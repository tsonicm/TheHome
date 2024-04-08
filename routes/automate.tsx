import { Navbar } from "../components/Navbar.tsx";

export default function Home() {
  return (
    <div class="absolute px-4 py-8 mx-auto bottom-0 bg-slate-500 h-dvh w-dvw">
      <Navbar currentPage="/automate"/>
    </div>
  );
}
