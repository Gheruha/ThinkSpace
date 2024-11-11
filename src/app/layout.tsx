import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/global.css';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Think Space',
	description: 'Organize your life quickly and easily'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
			</head>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
