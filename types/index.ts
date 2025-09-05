export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  pollId: string;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  creatorId: string;
  creator?: User;
  isActive: boolean;
  allowMultipleVotes: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  totalVotes: number;
}

export interface Vote {
  id: string;
  userId: string;
  pollId: string;
  optionId: string;
  createdAt: Date;
}

export interface CreatePollData {
  title: string;
  description?: string;
  options: string[];
  allowMultipleVotes: boolean;
  expiresAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
