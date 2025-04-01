'use client';

import { useEffect } from 'react';

export function ThemeFavicon() {
	useEffect(() => {
		const updateFavicon = (isDark: boolean) => {
			const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
			const appleIcon = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;

			if (favicon && appleIcon) {
				favicon.href = isDark
					? '/darkModeLogo/favicon-32x32.png'
					: '/lightModeLogo/favicon-32x32.png';
				appleIcon.href = isDark
					? '/darkModeLogo/apple-touch-icon.png'
					: '/lightModeLogo/apple-touch-icon.png';
			}
		};

		// Get system theme
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		updateFavicon(prefersDark.matches);

		// Listen for changes in system theme
		const listener = (event: MediaQueryListEvent) => updateFavicon(event.matches);
		prefersDark.addEventListener('change', listener);

		return () => prefersDark.removeEventListener('change', listener);
	}, []);

	return null;
}
