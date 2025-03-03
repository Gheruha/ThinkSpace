'use client';

import { useState } from 'react';

export const useEmailFromLocalStorage = () => {
	const getEmail = (): string => {
		try {
			const storedUserData = localStorage.getItem('userData');
			if (!storedUserData) return '';

			const parsedUser: { email?: string } = JSON.parse(storedUserData);
			return parsedUser.email ?? '';
		} catch (error) {
			console.error('Error parsing userData from localStorage:', error);
			return '';
		}
	};

	const [email, setEmail] = useState<string>(getEmail);

	return email;
};
