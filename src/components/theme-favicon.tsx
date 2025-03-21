'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ThemeFavicon() {
	const { theme, systemTheme } = useTheme();

	useEffect(() => {
		const currentTheme = theme === 'system' ? systemTheme : theme;
		const faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement;
		const appleIconLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;

		if (faviconLink && appleIconLink) {
			if (currentTheme === 'dark') {
				faviconLink.href = '/darkModeLogo/favicon-32x32.png';
				appleIconLink.href = '/darkModeLogo/apple-touch-icon.png';
			} else {
				faviconLink.href = '/lightModeLogo/favicon-32x32.png';
				appleIconLink.href = '/lightModeLogo/apple-touch-icon.png';
			}
		}
	}, [theme, systemTheme]);

	return null;
}
