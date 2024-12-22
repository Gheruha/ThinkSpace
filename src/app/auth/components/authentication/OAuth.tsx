'use client';
// File that will hold all the OAuth buttons
import { ThemeImage } from '@/components/themeImage';
import { Button } from '@/components/ui/button';
import React from 'react';

export const OAuth = () => {
	return (
		<div className="w-full flex justify-center pt-10">
			<form action="api/auth/googleOAuth" method="POST">
				<Button variant="outline" className="border rounded-full w-16 h-16">
					<ThemeImage
						lightSrc="/icons/google.png"
						darkSrc="/icons/google.png"
						alt="icon"
						className="w-8 h-8"
					/>
				</Button>
			</form>
		</div>
	);
};
