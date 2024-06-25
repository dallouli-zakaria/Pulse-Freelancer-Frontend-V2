export interface Client{

    id:number
    user: {
    name: string;
    email: string;
    password?: string;
}
    profession: string;
}