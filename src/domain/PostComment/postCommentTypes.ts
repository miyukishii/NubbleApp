
export interface PostComment {
  id: number;
  message: string;
  createdAt: string;
  postAuhtorId: number;
  author: {
    id: number;
    username: string;
    profileURL: string;
  }
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_url: string;
  is_online: boolean;
  full_name: string;
}

interface Post {
  id: number;
  text: string;
  user_id: number;
  image_url: string;
  is_fixed: boolean;
  is_activated: boolean;
  created_at: string;
  updated_at: string;
  status: string;
  meta: Record<string, unknown>;
}

export interface PostCommentAPI {
  id: number;
  message: string;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  post: Post;
  meta: Record<string, unknown>;
}
