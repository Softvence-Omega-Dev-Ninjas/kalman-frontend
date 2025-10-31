// types/job.ts
export type SortOption = "relevant" | "newest" | "oldest" | "priceHigh" | "priceLow";

export interface FilterState {
  search: string;
  category: string[];
  subCategory: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  limit: number;
  sortBy: SortOption;
}

export interface Job {
  experience_level: any;
  budget_type: string;
  budge_type: string;
  customer: any;
  total_applicants: any;
  jobActivity: any;
  timeline: string;
  job_type: any;
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  subCategory: string;
  createdAt: string;
  skills: string[];
  client: {
    name: string;
    rating: number;
    completedJobs: number;
  };
}

export interface Category {
  id: string;
  name: string;
  subCategories: string[];
  jobs: { location: string }[];
}