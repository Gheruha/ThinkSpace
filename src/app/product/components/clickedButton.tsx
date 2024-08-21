'use client';

import React, { createContext, useContext, useState } from 'react';

interface ButtonContextType {
	clickedButton: string;
	setClickedButton: (button: string) => void;
}

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const ButtonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [clickedButton, setClickedButton] = useState<string>('');

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
