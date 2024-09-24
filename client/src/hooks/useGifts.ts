import { useState, useEffect } from 'react';
import axios from '@/lib/axiosConfig';
import { Gift } from '../mocks/GiftList';
import { v4 as uuidv4 } from 'uuid';

const MAX_SELECTION = 3;
const USER_HASH =  window.localStorage.getItem('USER_HASH') || window.localStorage.setItem('USER_HASH', uuidv4());

export const useGifts = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedGifts, setSelectedGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{hash: string, ip: string} | null>(null);
  const [isUserConfirmed, setIsUserConfirmed] = useState(true);
  const [userTimestamp, setUserTimestamp] = useState(null);
  
  // Obtener y establer user IP
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setUser({hash: USER_HASH ?? uuidv4(), ip: response.data.ip});
      } catch (err) {
        console.error('No se pudo obtener la IP del usuario', err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Obtener los regalos del servidor
  useEffect(() => {
    if (!user) return;

    const fetchGifts = async () => {
      try {
        const response = await axios.post('/gifts', { user });
        const { data: { gifts: giftsFromApi, timestamp } } = response.data;

        if (!timestamp) {
          setIsUserConfirmed(false);
        }

        setUserTimestamp(timestamp)

        const savedSelections = JSON.parse(window.localStorage.getItem('selected_gifts') || '[]');

        const updatedGifts = giftsFromApi.map((gift: Gift) => {
          const isSelected = savedSelections.some((sg: Gift) => sg.id === gift.id);
          return { ...gift, selected: isSelected };
        });

        setGifts(updatedGifts);
        setSelectedGifts(savedSelections);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, [user]);

  // Manejador para selección de los regalos
  const handleGiftSelection = (gift: Gift) => {
    if (gift.reserved) return;

    if (selectedGifts.length >= MAX_SELECTION && !gift.selected) {
      return false;
    }

    const updatedSelectedGifts = gift.selected
      ? selectedGifts.filter((sg) => sg.id !== gift.id)
      : [...selectedGifts, { ...gift, selected: true }];

    setSelectedGifts(updatedSelectedGifts);
    setGifts(gifts.map(g => g.id === gift.id ? { ...g, selected: !g.selected } : g));
    return true;
  };
  
  return {
    gifts,
    loading,
    isUserConfirmed,
    userTimestamp,
    handleGiftSelection,
  };
};
