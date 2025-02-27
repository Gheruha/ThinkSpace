'use client';

import { useEffect, useState } from 'react';

export const useEmailFromLocalStorage = () => {
	const [email, setEmail] = useState<string>('');

	useEffect(() => {
		const storedUserData = localStorage.getItem('userData');
		if (storedUserData) {
			try {
				const parsedUser = JSON.parse(storedUserData);
				setEmail(parsedUser.email || '');
			} catch (error) {
				console.error('Error parsing userData from localStorage:', error);
			}
		}
	}, []);

	return email;
};
