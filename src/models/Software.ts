export interface News {
    news: {
        id: number;
        description: string;
        image_url: string;
        created_at: string;
    }
}

export interface Service {
    services: {
        id: number;
        title: string;
        description: string;
        status: number;
        image_url: string;
        whatsapp: string;
        discord: string;
    }
}

export interface Portfolio {
    portfolios: {
        id: number;
        profile_id: number;
        category_id: number;
        title: string;
        description: string;
        url: string;
        nivel: number;
        status: number;
        profile: {
            id: number;
            user_id: number;
            avatar: string;
            nickname: string;
            profession: string;
            biography: string;
            avatar_url: string;
        };
        social: {
            id: number;
            profile_id: number;
            linkedin: string;
            instagram: string;
            twitter: string;
            youtube: string;
            pinterest: string;
            github: string;
            discord: string;
        };
        images: Array<{
            id: number;
            portfolio_id: number;
            image: string;
            image_url: string;
        }>;
    };
}