import { GeistSans } from 'geist/font/sans';
import '@/styles/css/global.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ButtonProvider } from './product/components/clickedButton';

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
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
				/>
			</head>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ButtonProvider>
						<main className="items-center">{children}</main>
					</ButtonProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
