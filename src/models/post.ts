import { PageFilter } from './common';

export type Post = {
  id: string;
  name: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  type: string;
  status: 'A' | 'I' | 'W';
  cost: number;
  electricityPrice?: number;
  waterPrice?: number;
  parkingPrice?: number;
  serviecPrice?: number;
  capacity: number;
  area: number;
  description: string;
  latitude: string;
  longitude: string;
  phone?: string;
  isLiked: boolean;
  avgRate: number;
  imageUrl: string[];
  utilities: string[];
  createdAt?: string;
  endedAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  authorId: string;
  authorName?: string;
  authorAvatar?: string;
  rateInfo: PostRateInfo;
};

export type Utilities = {
  id: string;
  name: string;
  icon: string;
};

export interface PostFilter extends PageFilter {
  name?: string;
  province?: string;
  district?: string;
  ward?: string;
  street?: string;
  status?: string;
  costFrom?: number;
  costTo?: number;
  depositFrom?: number;
  depositTo?: number;
  capacity?: number;
}

export type PostRateInfo = {
  id: number;
  postId: string;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
  total: number;
  avgRate: number;
  rateList: Rate[];
};

export type Rate = {
  postId?: string;
  star: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  authorName?: string;
  authorAvatar?: string;
};