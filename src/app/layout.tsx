import { getMetadata } from '@/lib/utils/metadata';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/global.css';

const icon = '/favicon_io/favicon-32x32.png';
const apple = '/favicon_io/apple-touch-icon.png';
const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = getMetadata({
	title: 'Root',
	description: 'Organize your life quickly and easily',
	url: defaultUrl,
	icon: icon,
	apple: apple
});

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={GeistSans.className}>
			<head />
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
