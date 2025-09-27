import user1 from "@/assets/dashboard/users/user1.png"
import user2 from "@/assets/dashboard/users/user2.png"
import user3 from "@/assets/dashboard/users/user3.png"
import user4 from "@/assets/dashboard/users/user4.png"
import user5 from "@/assets/dashboard/users/user5.png"
import user6 from "@/assets/dashboard/users/user6.png"

export interface IUserData {
  id: number;
  fileName: string;
  email: string;
  image:string;
  type: "Customer" | "Provider";
  status: "Active" | "Suspended" | "Deactivated";
  location: string;
  performance: {
    earned: string;
    jobsPosted?: number;
    rating?: number;
    completed?: number;
  };
  lastActive: string;
}


export const userData: IUserData[] = [
  {
    id: 1,
    fileName: 'Kristin Watson',
    image:user1,
    email: 'sara.cruz@example.com',
    type: 'Customer',
    status: 'Active',
    location: 'Bratislava, Slovakia',
    performance: { earned: '$451,680.00', jobsPosted: 12 },
    lastActive: '4/4/18',
  },
  {
    id: 2,
    fileName: 'Bessie Cooper',
    image:user2,
    email: 'bill.sanders@example.com',
    type: 'Provider',
    status: 'Suspended',
    location: 'Košice, Slovakia',
    performance: { earned: '$4,680.00', jobsPosted: 4, rating: 4.9 },
    lastActive: '12/4/17',
  },
  {
    id: 3,
    fileName: 'Leslie Alexander',
    image:user3,
    email: 'alma.lawson@example.com',
    type: 'Customer',
    status: 'Deactivated',
    location: 'Žilina, Slovakia',
    performance: { earned: '$451,680.00', jobsPosted: 12 },
    lastActive: '1/31/14',
  },
  {
    id: 4,
    fileName: 'Annette Black',
    image:user4,
    email: 'willie.jennings@example.com',
    type: 'Provider',
    status: 'Active',
    location: 'Trnava, Slovakia',
    performance: { earned: '$40,680.00', completed: 12, rating: 4.8 },
    lastActive: '3/4/16',
  },
  {
    id: 5,
    fileName: 'Guy Hawkins',
    image:user5,
    email: 'deanna.curtis@example.com',
    type: 'Customer',
    status: 'Deactivated',
    location: 'Nitra, Slovakia',
    performance: { earned: '$451,680.00', jobsPosted: 12 },
    lastActive: '5/7/16',
  },
  {
    id: 6,
    fileName: 'Marvin McKinney',
    image:user6,
    email: 'michelle.rivera@example.com',
    type: 'Customer',
    status: 'Active',
    location: 'Banská Bystrica, Slovakia',
    performance: { earned: '$451,680.00', jobsPosted: 12 },
    lastActive: '2/11/12',
  },
];