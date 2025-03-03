'use client';

import React from 'react';
import { signInWithGoogleHandler } from '../handleFunctions';
import { ThemeImage } from '@/components/theme-image';
import { Button } from '@/components/ui/button';

export const OAuth = () => {
	return (
		<div className="w-full flex justify-center pt-10">
			<Button
				variant="outline"
				className="border rounded-full w-16 h-16"
				onClick={signInWithGoogleHandler}
			>
				<ThemeImage
					lightSrc="/icons/google.png"
					darkSrc="/icons/google.png"
					alt="icon"
					className="w-8 h-8"
					width={32}
					height={32}
				/>
			</Button>
		</div>
	);
};
