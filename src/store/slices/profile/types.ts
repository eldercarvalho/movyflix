type Gravatar = {
  hash: string;
};

type Avatar = {
  gravatar: Gravatar;
};

export interface Account {
  id: number;
  avatar: Avatar;
  name: string;
  username: string;
}

export interface List {
  id: number;
  name: string;
  description: string;
  poster_path: string;
  item_count: number;
  favorite_count: number;
  list_type: number;
}
