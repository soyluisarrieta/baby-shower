export const GIFTS_LIST = [
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
  [1, 2, 3, 4, 5].map(num => `${num}. ${item}`)
);

export interface Gift {
  id: number;
  name: string;
  selected: boolean;
  reserved: boolean;
}

export const createInitialGifts = (): Gift[] => 
  GIFTS_LIST.map((gift, index) => ({
    id: index + 1,
    name: gift,
    selected: false,
    reserved: false,
  }));
