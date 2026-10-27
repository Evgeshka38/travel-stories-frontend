export interface PopularStory {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: {
    _id: string;
    name: string;
  } | null;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  } | null;
  date: string;
  favoriteCount: number;
}

export interface GetPopularStoriesResponse {
  status: number;
  message: string;
  data: {
    stories: PopularStory[];
    page: number;
    perPage: number;
    totalItems: number;
    hasNextPage: boolean;
  };
}
