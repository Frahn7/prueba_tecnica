import { Products } from "./components/Products";

export default function Home() {
  return (
    <div className="flex items-center text-center py-5 flex-col w-full min-h-screen">
      <h1 className="text-[25px] font-bold w-full">Prueba técnica</h1>
      <Products />
    </div>
  );
}
