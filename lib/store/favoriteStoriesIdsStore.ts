import { create } from 'zustand';

type StoryId = string;

interface FavoriteStoriesIdsStore {
  favoriteStoriesIds: StoryId[];
  setFavoriteStoriesIds: (storiesIds: StoryId[]) => void;
  clearFavoriteStoriesIds: () => void;
}

const initialFavoriteStoriesIds: StoryId[] = [];

export const useFavoriteStoriesStore = create<FavoriteStoriesIdsStore>()((
  set,
) => {
  return {
    favoriteStoriesIds: initialFavoriteStoriesIds,

    setFavoriteStoriesIds: (newStoriesIds) => {
      set({ favoriteStoriesIds: newStoriesIds });
    },

    clearFavoriteStoriesIds: () => {
      set({ favoriteStoriesIds: initialFavoriteStoriesIds });
    },
  };
});
