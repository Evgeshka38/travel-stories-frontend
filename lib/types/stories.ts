export interface PopularStory {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: {
    _id: string;
    name: string;
  };
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
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

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: {
    _id: string;
    name: string;
  };
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
}

export interface PaginatedStoriesData {
  stories: Story[];
  page: number;
  perPage: number;
  totalItems: number;
  hasNextPage: boolean;
}
