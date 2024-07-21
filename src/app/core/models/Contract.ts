export interface Contract{
    id:number;
    title: string;
    period?: string;
    budget?: number;
    project_description: string;
    client_id?:number;
    freelancer_id: number;
    created_at?:Date

}