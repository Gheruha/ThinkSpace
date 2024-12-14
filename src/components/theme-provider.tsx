'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevents mismatching className during hydration
	if (!mounted) {
		return <div style={{ visibility: 'hidden' }}>{children}</div>;
	}

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
