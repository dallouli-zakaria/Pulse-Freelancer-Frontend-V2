export interface Freelancer{
  id: number;
  user: {
    name: string;
    email: string;
    password?: string;
  };
  title: string;
  dateOfBirth: string;
  city: string;
  TJM: string;
  summary: string;
  availability: string;
  address: string;
  phone: string;
  portfolio_Url: string;
  CV: string;

}