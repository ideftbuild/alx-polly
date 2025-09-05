'use client';

import { useContext } from 'react';
import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

// We declare the context here so that the hook can import from a stable path
// while the provider continues to live in providers/auth-provider.tsx.
export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}


