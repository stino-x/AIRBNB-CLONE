import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import useLoginModal from './useLoginModal';
import toast from 'react-hot-toast';
import axios from 'axios';

interface IUseFavourite {
  ListingId: string;
  currentUser?: User | null;
}

const useFavourite = ({ ListingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(ListingId);
  }, [currentUser, ListingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${ListingId}`);
          toast.success('Deleted');
        } else {
          request = () => axios.post(`/api/favourites/${ListingId}`);
          toast.success('Liked');
        }

        await request();
        router.refresh();
        // toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, hasFavourited, loginModal, ListingId, router]
  );

  return { hasFavourited, toggleFavourite };
};

export default useFavourite;