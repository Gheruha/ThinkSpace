'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

type ThemeImageProps = Omit<
	React.ComponentProps<typeof Image>,
	'src' | 'alt' | 'width' | 'height'
> & {
	lightSrc: string;
	darkSrc: string;
	alt: string;
	width: number;
	height: number;
};

export function ThemeImage({ lightSrc, darkSrc, alt, width, height, ...props }: ThemeImageProps) {
	const { theme, systemTheme } = useTheme();

	const currentTheme = useMemo(
		() => (theme === 'system' ? (systemTheme ?? 'light') : theme),
		[theme, systemTheme]
	);

	const imageSrc = currentTheme === 'dark' ? darkSrc : lightSrc;

	return <Image src={imageSrc} alt={alt} width={width} height={height} {...props} />;
}
