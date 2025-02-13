'use client';

import { ThemeImage } from '@/components/themeImage';
import { Button } from '@/components/ui/button';
import { handleSignInWithOAuth } from '../handleFunctions';
import React from 'react';

export const OAuth = () => {
	return (
		<div className="w-full flex justify-center pt-10">
			<Button
				variant="outline"
				className="border rounded-full w-16 h-16"
				onClick={handleSignInWithOAuth}
			>
				<ThemeImage
					lightSrc="/icons/google.png"
					darkSrc="/icons/google.png"
					alt="icon"
					className="w-8 h-8"
				/>
			</Button>
		</div>
	);
};
