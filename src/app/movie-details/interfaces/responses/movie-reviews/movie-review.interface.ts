export interface MovieReview {
  author: string;
  auhor_detais: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: string | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
