import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import HappyEmoji from '@/components/HappyEmoji';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { LightbulbIcon } from 'lucide-react';
import { useGifts } from '@/hooks/useGifts';
import { Gift } from "@/mocks/GiftList";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const QUETIONS = [
  {q: '¿Niño o Niña?', a: 'Es un hermoso y bello Niño 👶🏽'},
  {q: '¿Qué necesita el bebé al llegar?', a: 'Mucho amor, cuidado y unos primeros pañales para comenzar la aventura 🌟'},
  {q: '¿Cuántos meses tiene mamá?', a: 'Alrededor de 8 meses, ¡la espera está llegando a su fin! ⏳'},
  {q: '¿Cuando nace?', a: 'Según los cálculos médicos el 14 de Octubre, pero posiblemente se adelante 😵‍💫'},
  {q: '¿Peso estimado?', a: 'Alrededor de 3.5 kg, aunque puede variar un poco 📏'},
  {q: '¿Donde va a nacer?', a: 'Aunque nos gustaría un parto en casa, nacerá en un hospital 🏥'},
  {q: '¿Por qué Sebastián?', a: 'Emprendimos como "Paylus Estudio", una combinación de los nombres Paola y Luis. Optamos por usar el plural con la idea de que, si algún día tuviéramos un hijo o una hija, lo llamaríamos con esta inicial. Sebastián, nombre asociado con respeto y honor 🤗'},
  {q: '¿Y Camilo como segundo nombre?', a: 'Es el nombre de nuestro artista Colombiano favorito (y también porque combina de maravilla). Camilo, nombre que hace referencia a un hombre noble. 😌'},
]

const GiftSelector = () => {
  const [showGiftLimitDialog, setShowGiftLimitDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  
  const {
    gifts,
    selectedGifts,
    loading,
    error,
    isUserConfirmed,
    userTimestamp,
    handleGiftSelection,
    handleConfirm,
    handleReset
  } = useGifts();

  const handleGiftClick = (gift: Gift) => {
    const isGiftSelected = handleGiftSelection(gift);
    if (isGiftSelected === false) {
      setShowGiftLimitDialog(true);
    }
  };

  const handleConfirmClick = async () => {
    const isSuccess = await handleConfirm();
    if (isSuccess) {
      setShowSuccessDialog(true);
    } else {
      setShowErrorDialog(true);
    }
  };

  return (
    <main className='min-h-screen bg-gradient-to-tr from-orange-500/10 to-orange-500/5 relative'>
      <div className="absolute w-full h-full z-50 pointer-events-none select-none contrast-200 opacity-70" style={{background: 'url(/images/noise.webp)'}}></div>
      
      {/* Header */}
      <div className='container mx-auto grid grid-cols-2 lg:grid-cols-4 [&_img]:max-h-32 [&_img]:object-top [&_img]:object-contain'>
        <div className={cn('px-6 grid grid-cols-3 gap-6 pointer-events-none select-none transition-all duration-700 opacity-0 -translate-y-10', !loading && 'opacity-100 translate-y-0')}>
          <img src='./images/baby-decoration1.png' alt='Decoración 1' />
          <img src='./images/baby-decoration2.png' alt='Decoración 2' />
          <img src='./images/baby-decoration3.png' alt='Decoración 3' />
        </div>
        <div className={cn('lg:order-2 px-6 grid grid-cols-3 gap-6 pointer-events-none select-none transition-all duration-700 opacity-0 -translate-y-10', !loading && 'opacity-100 translate-y-0')}>
          <img src='./images/baby-decoration4.png' alt='Decoración 4' />
          <img src='./images/baby-decoration5.png' alt='Decoración 5' />
          <img src='./images/baby-decoration6.png' alt='Decoración 6' />
        </div>
        <div className={cn('col-span-2 p-6 transition-opacity duration-700 opacity-0 delay-100', !loading && 'opacity-100')}>
          <h1 className="text-4xl font-bold mb-2 text-center">
            { isUserConfirmed ? 'Ya has confirmado tus regalos' : 'Selecciona hasta 3 regalos' }
          </h1>
          <p className='max-w-xl mx-auto mb-6 text-center'>
            {!userTimestamp && (
              <>
                Para evitar que haya regalos repetidos entre los invitados, hemos creado esta aplicación que les permitirá elegir el obsequio
                <HappyEmoji className='ml-1' size={16} />
              </>
            )}
          </p>
          <p className='max-w-xl mx-auto mb-3 text-center text-sm'>
            ¡Esto NO es un requisito; <span className='font-semibold'>ya eres nuestro invitado/a</span> para acompañarnos al Baby Shower!
          </p>
        </div>
      </div>

      {/* Gift Selection */}
      <div className="container mx-auto p-6">
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5 border-2 border-dashed rounded-3xl select-none transition-all duration-700 opacity-0 translate-y-20", !loading && 'opacity-100 translate-y-0')}>
          {gifts.map(gift => (
            <Button 
              key={gift.id}
              className={cn(
                'h-auto whitespace-normal inline-block p-7 text-md hover:scale-[1.02] transition disabled:opacity-100', 
                gift.reserved && 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed pointer-events-none disabled:opacity-50',
                gift.selected ? 'bg-green-300 text-green-700 border-green-400 hover:bg-green-300 hover:text-green-700 hover:border-green-400 disabled:opacity-100' : 
                'bg-white text-gray-700 border-border hover:bg-white lg:hover:bg-green-100 lg:hover:border-green-500 lg:hover:text-green-500'
              )}
              variant='outline'
              onClick={() => !isUserConfirmed && handleGiftClick(gift)}
              disabled={gift.reserved}
            >
              {gift.name}
            </Button>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className={cn('w-full h-fit flex justify-center text-center fixed bottom-0 left-0 transition-all duration-700 opacity-0 translate-y-full', !loading && 'opacity-100 translate-y-0')}>
          {!isUserConfirmed && (
            <div className='w-full lg:w-fit bg-orange-500/20 backdrop-blur-sm p-5 lg:rounded-lg border lg:space-x-4 space-y-4 lg:space-y-0'>
              <Button 
                className="w-full lg:w-auto text-white bg-blue-500 py-7 px-10 hover:bg-blue-600 active:bg-blue-800 disabled:opacity-100 disabled:grayscale" 
                disabled={!selectedGifts.length}
                onClick={() => setShowWarningDialog(true)}
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
          )}
        </div>
        
        { isUserConfirmed && (
          <div className={cn('text-center text-sm p-6 transition-all duration-700 opacity-0 translate-y-10', !loading && 'opacity-100 translate-y-0')}>
            {userTimestamp && <><Badge className="mb-2">Confirmaste el regalo el {userTimestamp}</Badge><br/></>}
            ¿Si necesitas reiniciar tu elección? puedes comunicarte con Jessi para darte una mano <HappyEmoji size={16} />
          </div>
        )}

        <div className={cn("w-full flex items-center flex-col transition-opacity opacity-0 duration-500 delay-200 pt-10 pb-52", !loading && 'opacity-100')}>
          <h2 className="text-2xl font-bold my-3">Preguntas y respuestas</h2>
          <Accordion className="max-w-xl w-full" type="single" collapsible>
              {QUETIONS.map(({q: question, a: answer}, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>

        {/* Max gifts Dialog */}
        <AlertDialog open={showGiftLimitDialog}>
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
              <AlertDialogAction onClick={() => setShowGiftLimitDialog(false)}>¡Listo!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Error Dialog */}
        <AlertDialog open={showErrorDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¡Oops!</AlertDialogTitle>
              <AlertDialogDescription className='mb-3'>
                {error}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowErrorDialog(false)}>¡Listo!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Warning Dialog */}
        <AlertDialog open={showWarningDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Última palabra?</AlertDialogTitle>
              <AlertDialogDescription className='mb-3'>
                Una vez confirmes los regalos, quedarán reservados por ti y no podrás cambiar tu elección.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowWarningDialog(false)}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => {handleConfirmClick(); setShowWarningDialog(false)}}>
                ¡Confirmar!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Success Dialog */}
        <AlertDialog open={showSuccessDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Perfecto <HappyEmoji /></AlertDialogTitle>
              <AlertDialogDescription className='mb-3'>
                La reservación {selectedGifts.length > 1 ? 'de los regalos' : 'del regalo'} ha sido confirmada. Gracias por tu amabilidad y nos vemos pronto para celebrar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>¡Un gusto!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
};

export default GiftSelector;
