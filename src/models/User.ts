export interface Profile {
  id: number;
  userId: number;
  avatar: string;
  avatar_url: string;
  nickname: string;
  profession: string;
  biography: string;
  created_at: string;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  surname: string;    
  email: string;
  phone: string;
  birth: Date;
  genre: string;
}

export interface Academic {
  education: {
    id: number;
    institution: string;
    course: string;
    formation: string;
    study: string;
    start: string;
    end: string;
  };
  verify: boolean
}

export interface FormEducation {
  id: number;
  institutionUser: string;
  courseUser: string;
  formationUser: string;
  studyUser: string;
  startUser: string;
  endUser: string;
}

export interface Network {
  id: number;
  linkedin: string;
  instagram: string;
  twitter: string;
  youtube: string;
  pinterest: string;
  github: string;
  discord: string;
}

export interface AddressUser {
  id: number;
  zipcode: string;
  address: string;
  city: string;
  state: string;
  neighborhood: string;
  complement: string;
  number: string;
  reference: string;
}

