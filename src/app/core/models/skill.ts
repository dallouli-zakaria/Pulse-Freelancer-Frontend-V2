export interface Skill {
    includes(value: any): unknown;
    filter(arg0: (skill: any) => any): any;
    id:number;
    title:string;
    level:string;
}
