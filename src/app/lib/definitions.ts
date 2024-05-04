export interface Activity {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    volunteers: string[];
  }

  export interface Volunteer {
    id: string;
    name: string;
    city: string;
    activities: string[];
  }

  export interface Associations {
    id: string;
    name: string;
    city:  string;
    activities: string[];
  }