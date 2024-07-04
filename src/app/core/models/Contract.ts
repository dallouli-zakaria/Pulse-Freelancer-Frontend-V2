export interface Contract{
    id:number;
    title: string;
    period?: string;
    budget?: number;
    project_description: string;
    client_id?: string;
    freelancer_id?: string;
}