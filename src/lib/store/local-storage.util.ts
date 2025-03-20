'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user.type';

export const getUserDataFromLocalStorage = (): User | null => {
	if (typeof window === 'undefined') return null;

	try {
		const storedUserData = localStorage.getItem('userData');
		return storedUserData ? JSON.parse(storedUserData) : null;
	} catch (error: unknown) {
		console.error('Error parsing userData from localStorage:', error);
		return null;
	}
};

export const useUserDataFromLocalStorage = () => {
	const [userData, setUserData] = useState<User | null>(getUserDataFromLocalStorage);

	useEffect(() => {
		const handleStorageChange = () => setUserData(getUserDataFromLocalStorage());
		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, []);

	return userData;
};
