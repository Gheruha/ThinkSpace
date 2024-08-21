import { useTheme } from 'next-themes';

type ThemeImageProps = {
	lightSrc: string;
	darkSrc: string;
	alt?: string;
	className?: string;
};

export function ThemeImage({ lightSrc, darkSrc, alt, className }: ThemeImageProps) {
	const { theme, systemTheme } = useTheme();

	const currentTheme = theme === 'system' ? systemTheme : theme;

	const imageSrc = currentTheme === 'dark' ? darkSrc : lightSrc;

	return <img src={imageSrc} alt={alt} className={className} />;
}
