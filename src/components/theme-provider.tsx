'use client';

import { useEffect, useState, useMemo } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const shouldRender = useMemo(() => mounted, [mounted]);
	if (!shouldRender) return null;

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
