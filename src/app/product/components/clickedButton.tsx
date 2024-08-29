'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ButtonContextType {
	clickedButton: string;
	setClickedButton: (button: string) => void;
}

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const ButtonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [clickedButton, setClickedButtonState] = useState<string>('');

	useEffect(() => {
		const storedButton = typeof window !== 'undefined' ? localStorage.getItem('clickedButton') : '';
		if (storedButton) {
			setClickedButtonState(storedButton);
		}
	}, []);

	const setClickedButton = (button: string) => {
		setClickedButtonState(button);
		if (typeof window !== 'undefined') {
			localStorage.setItem('clickedButton', button);
		}
	};

	return (
		<ButtonContext.Provider value={{ clickedButton, setClickedButton }}>
			{children}
		</ButtonContext.Provider>
	);
};

export const useButtonContext = (): ButtonContextType => {
	const context = useContext(ButtonContext);
	if (!context) {
		throw new Error('useButtonContext must be used within a ButtonProvider');
	}
	return context;
};
