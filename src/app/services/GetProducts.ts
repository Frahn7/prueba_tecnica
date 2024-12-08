export interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  listingPrice?: number;
  stock: number;
  salesUnit: "group" | "unit" | "area";
  measurementUnit?: "m2" | "m" | "pallet" | "bolson";
  unitValue?: number;
  quantity: number;
  image: string;
}

export default function GetProducts() {
  const products: ProductsProps[] = [
    {
      id: 100012,
      title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
      description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
      price: 60588,
      listingPrice: 67320,
      stock: 5,
      salesUnit: "group",
      measurementUnit: "pallet",
      unitValue: 198,
      image: "/img/palets.jpg",
      quantity: 1,
    },
    {
      id: 2060,
      title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
      description:
        "Ceramica esmaltada36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
      price: 13031,
      stock: 5,
      salesUnit: "area",
      measurementUnit: "m2",
      unitValue: 2.68,
      image: "/img/ceramica.jpg",
      quantity: 1,
    },
    {
      id: 10035,
      title: "Hierro 25 mm x 12 m Acindar",
      description: "HIERRO 25 MM X 12M",
      price: 76293,
      listingPrice: 89757,
      stock: 5,
      salesUnit: "unit",
      image: "/img/barra.jpg",
      quantity: 1,
    },
    {
      id: 5001,
      title: "Pintura Latex Blanco Mate 20L",
      description:
        "Pintura Latex Blanco Mate, ideal para interiores y exteriores",
      price: 15240,
      listingPrice: 20350,
      stock: 10,
      salesUnit: "unit",
      measurementUnit: "m2",
      unitValue: 20,
      image: "/img/pintura.jpg",
      quantity: 1,
    },
    {
      id: 8003,
      title: "Bolsa de Cemento Portland 50Kg",
      description:
        "Bolsa de Cemento Portland de 50Kg para uso general en construcción",
      price: 2475,
      stock: 25,
      salesUnit: "unit",
      measurementUnit: "bolson",
      unitValue: 50,
      image: "/img/cemento.jpg",
      quantity: 1,
    },
  ];

  return { products };
}
