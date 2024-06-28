export interface Client{

    id:number
    user: {
    name: string;
    email: string;
    password?: string;
}
    profession: string;
    company_name: string;
    company_activity: string;
    company_email: string;
}