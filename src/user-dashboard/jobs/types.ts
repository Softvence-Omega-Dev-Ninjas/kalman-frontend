// src/types/proposal.ts
export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  timeline: string;
  image?: string[];
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TradesMan {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
}

export interface Proposal {
  id: string;
  description: string;
  jobId: string;
  tradesManId: string;
  userId: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  jobs?: Job;
  tradesMan?: TradesMan;
  user?: User;
}
