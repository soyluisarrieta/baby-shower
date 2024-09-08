import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Gift, createInitialGifts } from '../mocks/GiftList';
import HappyEmoji from '@/components/HappyEmoji';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { LightbulbIcon } from 'lucide-react';

const USER_ID = window.localStorage.getItem('USER_ID') || window.localStorage.setItem('USER_ID', crypto.randomUUID());
const MAX_SELECTION = 3;

export default function GiftSelector() {
  const [gifts, setGifts] = useState<Gift[]>(createInitialGifts);
  const [selectedGifts, setSelectedGifts] = useState<Gift[]>([]);
  const [isMaxGiftsDialogOpen, setIsMaxGiftsDialogOpen] = useState(false);

  // Cargar regalos y selección guardada desde localStorage
  useEffect(() => {
    const savedSelections = JSON.parse(window.localStorage.getItem(`selected_gifts`) || '[]');
    setSelectedGifts(savedSelections);
    setGifts(prevGifts => prevGifts.map(gift => ({
      ...gift,
      selected: savedSelections.some((sg: Gift) => sg.id === gift.id),
    })));
  }, []);

  // Actualizar regalos cuando cambia la selección
  useEffect(() => {
    setGifts(prevGifts => prevGifts.map(gift => ({
      ...gift,
      selected: selectedGifts.some((sg: Gift) => sg.id === gift.id),
    })));
  }, [selectedGifts]);

  const handleGiftSelection = (gift: Gift) => {
    if (selectedGifts.length >= MAX_SELECTION && !gift.selected) {
      setIsMaxGiftsDialogOpen(true);
      return;
    }

    const updatedSelectedGifts = gift.selected
      ? selectedGifts.filter((sg) => sg.id !== gift.id)
      : [...selectedGifts, { ...gift, selected: true }];

    setSelectedGifts(updatedSelectedGifts);
  };

  // Guardar selección en localStorage
  const handleConfirm = () => {
    window.localStorage.setItem(`selected_gifts`, JSON.stringify(selectedGifts));
  };

  const handleReset = () => {
    setSelectedGifts([]);
    setGifts(gifts.map(g => ({ ...g, selected: false })));
    window.localStorage.removeItem(`selected_gifts`);
  };

  return (
    <main className='bg-orange-50/30'>
      {/* Header */}
      <div className='container mx-auto grid grid-cols-2 lg:grid-cols-4 [&_img]:max-h-32 [&_img]:object-top [&_img]:object-contain'>
        <div className='px-6 grid grid-cols-3 gap-6'>
          <img src='./images/baby-decoration1.png' alt='Decoración 1' />
          <img src='./images/baby-decoration2.png' alt='Decoración 2' />
          <img src='./images/baby-decoration3.png' alt='Decoración 3' />
        </div>
        <div className='lg:order-2 px-6 grid grid-cols-3 gap-6'>
          <img src='./images/baby-decoration4.png' alt='Decoración 4' />
          <img src='./images/baby-decoration5.png' alt='Decoración 5' />
          <img src='./images/baby-decoration6.png' alt='Decoración 6' />
        </div>
        <div className='col-span-2 p-6'>
          <h1 className="text-4xl font-bold mb-2 text-center">Selecciona hasta 3 regalos</h1>
          <p className='max-w-xl mx-auto mb-6 text-center'>
            Para evitar que haya regalos repetidos entre los invitados, hemos creado esta aplicación que te permitirá elegir el obsequio
            <HappyEmoji className='ml-1' size={16} />
          </p>
          <p className='max-w-xl mx-auto mb-3 text-center text-sm'>
            ¡Esto NO es un requisito; <span className='font-semibold'>ya eres nuestro invitado/a</span> para acompañarnos al Baby Shower!
          </p>
        </div>
      </div>

      {/* Gift Selection */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5 border-2 border-dashed rounded-3xl pb-40">
          {gifts.map(gift => (
            <Button 
              key={gift.id}
              className={cn(
                'h-auto whitespace-normal inline-block p-7 text-md hover:scale-[1.02] transition', 
                gift.selected ? 'bg-green-300 text-green-700 border-green-400 hover:bg-green-300 hover:text-green-700 hover:border-green-400 ' : 'bg-white text-gray-700 border-border hover:bg-green-100 hover:border-green-500 hover:text-green-500'
              )}
              variant='outline'
              onClick={() => handleGiftSelection(gift)}
            >
              {gift.name}
            </Button>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="w-full h-fit flex justify-center text-center fixed bottom-0 left-0">
          <div className='w-full lg:w-fit bg-orange-200/20 backdrop-blur-sm p-5 lg:rounded-lg border lg:space-x-4 space-y-4 lg:space-y-0'>
            <Button 
              className="w-full lg:w-auto text-white bg-blue-500 py-7 px-10 hover:bg-blue-600 active:bg-blue-800 disabled:opacity-100 disabled:grayscale" 
              disabled={!selectedGifts.length}
              onClick={handleConfirm}
            >
              Confirmar ({selectedGifts.length})
            </Button>
            <Button 
              className='w-full lg:w-auto py-7 px-10 disabled:opacity-100 disabled:grayscale' 
              disabled={!selectedGifts.length} 
              variant='outline'
              onClick={handleReset}
            >
              Reiniciar
            </Button>
          </div>
        </div>

        {/* Alert Dialog */}
        <AlertDialog open={isMaxGiftsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Límite de regalos alcanzado</AlertDialogTitle>
              <AlertDialogDescription className='mb-3'>
                Solo deberías seleccionar un máximo de 3 regalos por invitado. No te preocupes, ¡es más que suficiente! <HappyEmoji size={16} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='text-xs text-muted-foreground items-center lg:!justify-between gap-y-5 text-center lg:text-left'>
              <div>
                <LightbulbIcon className='inline-block -mt-1' size={14} /> TIP:
                <span className='font-normal ml-1'>Puedes hacer clic en el regalo para deseleccionar.</span>
              </div>
              <AlertDialogAction onClick={() => setIsMaxGiftsDialogOpen(false)}>¡Listo!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
};
