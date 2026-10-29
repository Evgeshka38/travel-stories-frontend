export interface getUsersMeResponse {
  status: number;
  message: string;
  data: {
    _id: string;
    name: string;
    avatarUrl: string;
    description: string;
    articlesAmount: number;
    favorites: string[];
  } | null;
}
