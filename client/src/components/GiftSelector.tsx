import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useGifts } from '@/hooks/useGifts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ThanksSVG from "@/components/ThanksSVG";
import { Badge } from "@/components/ui/badge";

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
  const {
    gifts,
    loading,
    isUserConfirmed,
    userTimestamp
  } = useGifts();

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
        <div className={cn('col-span-2 flex justify-center items-center transition-opacity duration-700 opacity-0 delay-100', !loading && 'opacity-100')}>
          <ThanksSVG />
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
              onClick={() => !isUserConfirmed}
              disabled={gift.reserved}
            >
              {gift.name}
            </Button>
          ))}
        </div>
        
        { userTimestamp && (
          <div className="flex justify-center py-6">
            <Badge className="mb-2">Confirmaste el regalo el {userTimestamp}</Badge><br/>
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
      </div>
    </main>
  );
};

export default GiftSelector;
