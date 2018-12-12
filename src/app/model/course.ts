

export interface Course {
    id:string;
    titles: {
        description:string;
        longDescription: string;
    };
    iconUrl: string;
    courseListIcon: string;
    categories:string[];
    lessonsCount:number;
}
