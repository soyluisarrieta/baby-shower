import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

const GIFTS = [
  'Babero con nombre personalizado',
  'Caja de pañales tamaño recién nacido',
  'Chupetes de silicona',
  'Conjunto de ropa para bebé',
  'Manta suave para bebé',
  'Juguetes de estimulación temprana',
  'Silla para coche',
  'Termómetro digital para bebé',
  'Kit de cuidado personal para bebé',
  'Almohada de lactancia',
  'Cambiador portátil', 
  'Móvil musical para cuna', 
  'Alfombra de juegos para bebé', 
  'Set de biberones', 
  'Monitor de bebé', 
  'Espejo para coche', 
  'Silla de paseo', 
  'Bañera para bebé', 
  'Toallas con capucha',
  'Juego de sábanas para cuna'
].flatMap((item) => 
  [1, 2, 3, 4, 5].map(num => `${num}${item}`)
);

export default function App() {
  const [selectedGifts, setSelectedGifts] = useState([]);

  const onSelectGift = (gift: string) => {
    console.log(gift);
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Selecciona hasta 3 regalos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 border rounded-3xl">
        {GIFTS.map(gift => (
          <Toggle 
            key={gift}
            className='h-auto p-7 text-md hover:bg-green-100 hover:border-green-500 hover:text-green-500 data-[state=on]:bg-green-300 data-[state=on]:text-green-700 data-[state=on]:border-green-400'
            variant='outline'
            onClick={() => { onSelectGift(gift) }}
          >
            {gift}
          </Toggle>
        ))}
      </div>
      
      <div className="w-full block text-center p-5 space-x-4 space-y-4">
        <Button className="w-full md:w-auto text-white bg-blue-500 py-7 px-10 hover:bg-blue-600 active:bg-blue-800" disabled={!selectedGifts.length}>
          Confirmar ({selectedGifts.length})
        </Button>
        <Button 
          className='w-full md:w-auto' 
          disabled={!selectedGifts.length} 
          variant='ghost'
          onClick={() => setSelectedGifts([])}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
