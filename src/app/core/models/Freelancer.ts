export interface Freelancer{
  id:number
  user:{ 
      name: string;
      email: string;
  };
  password?: string;
  title: string;
  dateOfBirth: string; 
  city: string;
  TJM: number;
  summary: string;
  availability: string;
  adress: string;
  phone: string;
  portfolio_Url?: string;
  CV?: string; 
}