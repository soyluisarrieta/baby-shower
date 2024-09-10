import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import axios from '@/lib/axiosConfig';
import { Gift } from '../mocks/GiftList';
import HappyEmoji from '@/components/HappyEmoji';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { LightbulbIcon } from 'lucide-react';

const MAX_SELECTION = 3;

export default function GiftSelector() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedGifts, setSelectedGifts] = useState<Gift[]>([]);
  const [isMaxGiftsDialogOpen, setIsMaxGiftsDialogOpen] = useState(false);
  const [wasErrorDialogOpen, setWasErrorDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isUserConfirmed, setIsUserConfirmed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userIp, setUserIp] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setUserIp(response.data.ip);
      } catch (err) {
        console.error('No se pudo obtener la IP del usuario', err);
        setUserIp(null);
      }
    };

    fetchUserIp();
  }, []);

  useEffect(() => {
    if (!userIp) return;
    
    const fetchGifts = async () => {
      try {
        const response = await axios.post('/gifts', {userIp});
        const { data: {gifts: giftsFromApi, user_exists} } = response.data;

        if (!user_exists) { setIsUserConfirmed(false)  }

        const savedSelections = JSON.parse(window.localStorage.getItem(`selected_gifts`) || '[]');

        const updatedGifts = giftsFromApi.map((gift: Gift) => {
          const isSelected = savedSelections.some((sg: Gift) => sg.id === gift.id);
          return { ...gift, selected: isSelected };
        });

        setGifts(updatedGifts);
        setSelectedGifts(savedSelections);
      } catch (err) {
        setError('No se pudieron recuperar los regalos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, [userIp]);

  // Selección de regalos
  const handleGiftSelection = (gift: Gift) => {
    if (gift.reserved) { return; }

    if (selectedGifts.length >= MAX_SELECTION && !gift.selected) {
      setIsMaxGiftsDialogOpen(true);
      return;
    }

    const updatedSelectedGifts = gift.selected
      ? selectedGifts.filter((sg) => sg.id !== gift.id)
      : [...selectedGifts, { ...gift, selected: true }];

    setSelectedGifts(updatedSelectedGifts);
    setGifts(gifts.map(g => g.id === gift.id ? { ...g, selected: !g.selected } : g));
  };

  // Guardar selección en localStorage
  const handleConfirm = async () => {
    window.localStorage.setItem(`selected_gifts`, JSON.stringify(selectedGifts));
    if (!userIp) return;
    
    try {
      await axios.post('/confirm-gifts', { userIp, gifts: selectedGifts });
      setIsSuccessDialogOpen(true);
      setIsUserConfirmed(true)
    } catch (err) {
      setError('No se pudieron confirmar los regalos');
      console.error(err);
    }
  };

  // Reiniciar selección
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
          <h1 className="text-4xl font-bold mb-2 text-center">
            { isUserConfirmed ? 'Ya has confirmado tus regalos' : 'Selecciona hasta 3 regalos' }
          </h1>
          <p className='max-w-xl mx-auto mb-6 text-center'>
            Para evitar que haya regalos repetidos entre los invitados, hemos creado esta aplicación que les permitirá elegir el obsequio
            <HappyEmoji className='ml-1' size={16} />
          </p>
          <p className='max-w-xl mx-auto mb-3 text-center text-sm'>
            ¡Esto NO es un requisito; <span className='font-semibold'>ya eres nuestro invitado/a</span> para acompañarnos al Baby Shower!
          </p>
        </div>
      </div>

      {/* Gift Selection */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5 border-2 border-dashed rounded-3xl pb-40 select-none">
          {gifts.map(gift => (
            <Button 
              key={gift.id}
              className={cn(
                'h-auto whitespace-normal inline-block p-7 text-md hover:scale-[1.02] transition disabled:opacity-100', 
                gift.reserved && 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed pointer-events-none disabled:opacity-50',
                gift.selected ? 'bg-green-300 text-green-700 border-green-400 hover:bg-green-300 hover:text-green-700 hover:border-green-400 disabled:opacity-100' : 
                'bg-white text-gray-700 border-border hover:bg-green-100 hover:border-green-500 hover:text-green-500'
              )}
              variant='outline'
              onClick={() => !isUserConfirmed && handleGiftSelection(gift)}
              disabled={gift.reserved}
            >
              {gift.name}
            </Button>
          ))}
        </div>

        {/* Footer Buttons */}
        {!isUserConfirmed && (
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
        )}
        
        { isUserConfirmed && (
          <p className='text-center text-sm p-6'>
            ¿Si necesitas reiniciar tu elección? puedes comunicarte con Jessi para darte una mano <HappyEmoji size={16} />
          </p>
        )}

        {/* Max gifts Dialog */}
        <AlertDialog open={isMaxGiftsDialogOpen} onOpenChange={setIsMaxGiftsDialogOpen}>
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

        {/* Error Dialog */}
        <AlertDialog open={wasErrorDialogOpen} onOpenChange={setWasErrorDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¡Oops!</AlertDialogTitle>
              <AlertDialogDescription className='mb-3'>
                {error}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setWasErrorDialogOpen(false)}>¡Listo!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Success Dialog */}
        <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Perfecto <HappyEmoji /></AlertDialogTitle>
              <AlertDialogDescription className='mb-3'>
                La reservación {selectedGifts.length > 1 ? 'de los regalos' : 'del regalo'} ha sido confirmada. Gracias por tu amabilidad y nos vemos pronto para celebrar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsSuccessDialogOpen(false)}>¡Un gusto!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
