export interface Timestamps {
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPost extends Timestamps {
    id?: string; 
    title: string;
    content: string;
    description: string;
}

