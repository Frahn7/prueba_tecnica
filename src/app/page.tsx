import { Products } from "./components/Products";

export default function Home() {
  return (
    <div className="flex items-center text-center py-5 flex-col w-full min-h-screen bg-[#e8e6e6]">
      <h1 className="text-[25px] font-bold w-full mb-[40px]">Prueba técnica</h1>
      <Products />
    </div>
  );
}
