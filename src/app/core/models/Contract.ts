export interface Contract{
    id:number;
    title: string;
    start_date?: Date;
    end_date?: Date;
    project_description: string;
    client_id:number;
    freelancer_id: number;
    created_at?:Date

}