export interface IJobData {
  id: number;
  jobTitle: string;
  location: string;
  customer: string;
  serviceProvider: string;
  status: 'Completed' | 'In Progress' | 'Disputed' | 'Cancelled';
  amount: string;
  rate: 'Hourly' | 'Fixed';
}


export const jobData: IJobData[] = [
  {
    id: 1,
    jobTitle: 'Complete Kitchen Renovation Kitchen Fitting',
    location: 'Bratislava, Slovakia',
    customer: 'Guy Hawkins',
    serviceProvider: 'Annette Black',
    status: 'Completed',
    amount: '$20.00',
    rate: 'Hourly',
  },
  {
    id: 2,
    jobTitle: 'Emergency Boiler Repair Heating',
    location: 'Košice, Slovakia',
    customer: 'Savannah Nguyen',
    serviceProvider: 'Wade Warren',
    status: 'In Progress',
    amount: '$200.00',
    rate: 'Fixed',
  },
  {
    id: 3,
    jobTitle: 'Garden Landscaping Project Gardening',
    location: 'Žilina, Slovakia',
    customer: 'Wade Warren',
    serviceProvider: 'Arlene McCoy',
    status: 'Disputed',
    amount: '$20.00',
    rate: 'Hourly',
  },
  {
    id: 4,
    jobTitle: 'Emergency Boiler Repair Heating',
    location: 'Košice, Slovakia',
    customer: 'Devon Lane',
    serviceProvider: 'Eleanor Pena',
    status: 'Cancelled',
    amount: '$200.00',
    rate: 'Fixed',
  },
  {
    id: 5,
    jobTitle: 'Complete Kitchen Renovation Kitchen Fitting',
    location: 'Žilina, Slovakia',
    customer: 'Theresa Webb',
    serviceProvider: 'Leslie Alexander',
    status: 'Completed',
    amount: '$20.00',
    rate: 'Hourly',
  },
  {
    id: 6,
    jobTitle: 'Emergency Boiler Repair Heating',
    location: 'Košice, Slovakia',
    customer: 'Cody Fisher',
    serviceProvider: 'Theresa Webb',
    status: 'Cancelled',
    amount: '$200.00',
    rate: 'Fixed',
  },
  {
    id: 7,
    jobTitle: 'Complete Kitchen Renovation Kitchen Fitting',
    location: 'Žilina, Slovakia',
    customer: 'Dianne Russell',
    serviceProvider: 'Savannah Nguyen',
    status: 'Disputed',
    amount: '$20.00',
    rate: 'Hourly',
  },
  {
    id: 8,
    jobTitle: 'Emergency Boiler Repair Heating',
    location: 'Košice, Slovakia',
    customer: 'Jane Cooper',
    serviceProvider: 'Marvin McKinney',
    status: 'Cancelled',
    amount: '$200.00',
    rate: 'Fixed',
  },
  {
    id: 9,
    jobTitle: 'Garden Landscaping Project Gardening',
    location: 'Žilina, Slovakia',
    customer: 'Jenny Wilson',
    serviceProvider: 'Jacob Jones',
    status: 'Completed',
    amount: '$20.00',
    rate: 'Hourly',
  },
];
