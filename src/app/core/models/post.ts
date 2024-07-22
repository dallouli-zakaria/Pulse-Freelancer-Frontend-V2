export interface Post {
    id:number
    title:string, 
    location:string,
    type:string,
    description:string,
    freelancers_number:number,
    skills: any[];
    period:string,
    periodvalue:number | null,
    budget:string,
    budgetvalue:number | null,
    status:string,
    client_id:number,
    created_at: string;
}
