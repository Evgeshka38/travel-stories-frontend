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

export interface GetStoryByIdResponse {
  status: number;
  message: string;
  data: Story;
}

export interface AddRemoveStoryToFormFavoritesResponse {
  status: number;
  message: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      avatarUrl: string;
      description: string;
      articlesAmount: number;
      favorites: string[];
      createdAt: string;
      updatedAt: string;
    };
    story: {
      _id: string;
      img: string;
      title: string;
      article: string;
      category: string;
      ownerId: string;
      date: string;
      favoriteCount: number;
      createdAt: string;
      updatedAt: string;
    };
  };
}