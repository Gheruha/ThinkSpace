'use client';

import { ComponentType, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

interface ThemeIconProps {
	icon: ComponentType<{
		size?: number | string;
		strokeWidth?: number;
		color?: string;
		className?: string;
	}>;
}

export function ThemeIcon({ icon: Icon }: ThemeIconProps) {
	useEffect(() => {
		const updateFavicon = (isDark: boolean) => {
			const view = isDark
				? renderToStaticMarkup(<Icon size={32} color="#fff" strokeWidth={2} />)
				: renderToStaticMarkup(<Icon size={32} color="#000" strokeWidth={2} />);
			const blob = new Blob([view], { type: 'image/svg+xml' });
			const url = URL.createObjectURL(blob);

			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = 32;
				canvas.height = 32;

				const ctx = canvas.getContext('2d');
				if (!ctx) return;

				ctx.drawImage(img, 0, 0);

				const pngUrl = canvas.toDataURL('image/png');
				const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
				if (favicon) {
					favicon.href = pngUrl;
				}

				// Clean up the object URL
				URL.revokeObjectURL(url);
			};

			img.src = url;
		};

		// Get system theme
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		updateFavicon(prefersDark.matches);

		// Listen for changes in system theme
		const listener = (event: MediaQueryListEvent) => updateFavicon(event.matches);
		prefersDark.addEventListener('change', listener);

		return () => prefersDark.removeEventListener('change', listener);
	}, [Icon]);

	return null;
}
