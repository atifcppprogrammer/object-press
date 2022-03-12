export type AuthProps = {
  isAuthenticated: boolean;
  isValidToken: Function;
  signout: Function;
};

export type TokenState = {
  userId: string | null;
};

export interface JWToken {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export interface Profile {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  country: string;
  website: string;
  notify: boolean;
}

export interface Blog {
  id: string;
  title: string;
  hook: string;
  description: string;
  active: boolean;
  createDate: string;
}

export type NewBlog = Pick<Blog, 'title' | 'active'> &
  Pick<Partial<Blog>, 'hook' | 'description'>;

export interface BlogRow {
  id: string;
  title: string;
  description: string;
  createDate: string;
  active: boolean;
  hook: string;
}

export type BlogState = {
  blogs: Blog[];
  loading: boolean;
  error?: string;
  fetched: boolean;
};

export interface Content {
  title: string;
  publishAt: string;
  content: string;
  pageTitle: string;
  slug: string;
  keywords: string;
  description: string;
  images: string[];
  altTags: string[];
}

export type Post = {
  _id: string;
  appId: string;
  active: boolean;
  createDate: string;
  modifiedDate: string;
  post: Content;
};

export type NewPost = {
  appId: string;
  post: Content;
  active: boolean;
};

export type UpdatePost = {
  postId: string;
  post: Content;
  active: boolean;
};

export type PostRow = {
  _id: string;
  blog_id: string;
  blogTitle: string;
  post: Post;
  active: boolean;
};

export type PostState = {
  posts: Post[];
  loading: boolean;
  error?: string;
};

export interface Notify {
  id: string;
  title: string;
  content: string;
  createDate: string;
}
