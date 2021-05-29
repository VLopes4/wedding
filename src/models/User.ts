export interface Profile {
  id: number;
  userId: number;
  avatar: string;
  avatar_url: string;
  name: string;
  surname: string;
  user?: User;
}

export interface User {
  id: number;   
  email: string;
  status: number;
  level: number
}
