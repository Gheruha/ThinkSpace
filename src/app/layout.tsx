import { GeistSans } from 'geist/font/sans';
import '@/styles/css/global.css';

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
			</head>
			<body className="bg-background text-foreground">
				<main className="min-h-screen flex flex-col items-center">{children}</main>
			</body>
		</html>
	);
}
