import { useState, useEffect } from 'react';
import axios from '@/lib/axiosConfig';
import { Gift } from '../mocks/GiftList';
import { AxiosError } from 'axios';

const MAX_SELECTION = 3;

export const useGifts = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedGifts, setSelectedGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userIp, setUserIp] = useState<string | null>(null);
  const [isUserConfirmed, setIsUserConfirmed] = useState(true);
  const [userTimestamp, setUserTimestamp] = useState(null);

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        // const response = await axios.get('https://api.ipify.org?format=json');
        const response = {data: {ip: '123123123'}};
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
        const response = await axios.post('/gifts', { userIp });
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
        setError('No se pudieron recuperar los regalos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, [userIp]);

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

  const handleConfirm = async () => {
    window.localStorage.setItem('selected_gifts', JSON.stringify(selectedGifts));
    if (!userIp) return;

    try {
      await axios.post('/confirm-gifts', { userIp, gifts: selectedGifts });
      setIsUserConfirmed(true);
      return true;
    } catch (err) {
      const errMsg = err instanceof AxiosError
        ? err.response?.data?.message
        : 'No se pudieron confirmar los regalos'
      setError(errMsg);
      console.error(err);
      return false;
    }
  };

  // Reiniciar selección
  const handleReset = () => {
    setSelectedGifts([]);
    setGifts(gifts.map(g => ({ ...g, selected: false })));
    window.localStorage.removeItem(`selected_gifts`);
  };

  return {
    gifts,
    selectedGifts,
    loading,
    error,
    isUserConfirmed,
    userTimestamp,
    handleGiftSelection,
    handleConfirm,
    handleReset
  };
};
