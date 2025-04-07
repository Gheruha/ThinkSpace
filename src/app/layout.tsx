import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/global.css';
import { ThemeFavicon } from '@/components/theme-favicon';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={GeistSans.className}>
			<head>
				<link rel="icon" href="/lightModeLogo/favicon-32x32.png" sizes="32x32" />
				<link rel="apple-touch-icon" href="/lightModeLogo/apple-touch-icon.png" />
			</head>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ThemeFavicon />
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
