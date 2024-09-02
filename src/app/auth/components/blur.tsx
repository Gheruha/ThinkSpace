'use client';

import React, { createContext, useContext, useState } from 'react';

// Create a context with default values
const BlurContext = createContext<{
	isBlur: boolean;
	setIsBlur: React.Dispatch<React.SetStateAction<boolean>>;
	triggerBlur: () => void;
}>({
	isBlur: false,
	setIsBlur: () => {},
	triggerBlur: () => {}
});

// Custom hook to use the BlurContext
export const useBlurContext = () => useContext(BlurContext);

// Provide the context to your component tree
export const BlurProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isBlur, setIsBlur] = useState<boolean>(false);

	// Function to trigger blur for 60 seconds
	const triggerBlur = () => {
		setIsBlur(true);
		setTimeout(() => {
			setIsBlur(false);
		}, 60000); // 60000 ms = 60 seconds
	};

	return (
		<BlurContext.Provider value={{ isBlur, setIsBlur, triggerBlur }}>
			{children}
		</BlurContext.Provider>
	);
};
