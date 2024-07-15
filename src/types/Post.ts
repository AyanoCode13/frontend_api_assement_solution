export type GetPost = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export type AddPost = {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}