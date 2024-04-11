import { Navbar } from "../components/Navbar.tsx";
import Card from "../islands/Card.tsx";

const Placeholders = [
  { type: "colorLightBulb", id: "1" , name: "Bedroom", percentage: 5, color: "#FFDAE9", on: true },
  { type: "colorLightBulb", id: "2" , name: "Living Room", percentage: 80, color: "#DFEAFF", on: true },
  { type: "switch", id: "8" , name: "Basement", on: false },
  { type: "colorLightBulb", id: "3" , name: "Kitchen", percentage: 50, color: "#FFF", on: false },
  { type: "lightBulb", id: "4" , name: "Bathroom", percentage: 100, on: true },
  { type: "lightBulb", id: "5" , name: "Porch", percentage: 20, on: false },
  { type: "switch", id: "7" , name: "Backyard Switch", on: true },
  { type: "slider", id: "9" , name: "Office Blinds", percentage: 60},
  { type: "colorLightBulb", id: "6" , name: "Garage", percentage: 100, color: "purple", on: true },
]

export default function Home() {
  return (
    <div class="bg-gradient-to-tr from-slate-300 to-slate-800 h-dvh w-dvw p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pb-[80px]">
        {Placeholders.map(element => {
          return <Card 
                  id={element.id}
                  name={element.name}
                  brightness={element.percentage}
                  color={element.color}
                  on={element.on}
                  type={element.type}
                />
        })}
      </div>
      <Navbar currentPage="/"/>
    </div>
  );
}
