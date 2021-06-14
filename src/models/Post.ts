import { Profile } from "./User";

export interface Post {
    id: number;
    message: string;
    images: ImagePost[];
    profile: Profile;
    created_at: string;
}

export interface ImagePost {
    id: string;
    message_id: number;
    image: string;
    image_url: string;
}

export interface Image {
    original: string;
}