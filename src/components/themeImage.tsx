import Image from 'next/image';
import { useTheme } from 'next-themes';

type ThemeImageProps = {
	lightSrc: string;
	darkSrc: string;
	alt: string;
	className?: string;
	width?: number;
	height?: number;
};

export function ThemeImage({
	lightSrc,
	darkSrc,
	alt = '',
	className,
	width = 500,
	height = 500
}: ThemeImageProps) {
	const { theme, systemTheme } = useTheme();

	const currentTheme = theme === 'system' ? systemTheme : theme;

	const imageSrc = currentTheme === 'dark' ? darkSrc : lightSrc;

	return (
		<Image src={'/' + imageSrc} alt={alt} className={className} width={width} height={height} />
	);
}
