import { create } from 'zustand';

interface AuthState {
	email: string;
	setEmail: (email: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
	email: '',
	setEmail: (email) => set({ email })
}));

export default useAuthStore;
