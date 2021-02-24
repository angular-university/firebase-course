export interface Course {
  id: string;
  description: string;
  url:string;
  longDescription: string;
  iconUrl: string;
  seqNo:number;
  categories: string[];
  lessonsCount: number;
  promo:boolean;
}
