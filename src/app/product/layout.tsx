import LearningProductLayout from '@/lib/layouts/marketing';
import { getMetadata } from '@/lib/utils/metadata.utils';

const icon = '/favicon_io/favicon-32x32.png';
const apple = '/favicon_io/apple-touch-icon.png';
const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}/product`
	: 'http://localhost:3000/product';

export const metadata = getMetadata({
	title: 'Think Space',
	description: 'Organize your life quickly and easily',
	url: defaultUrl,
	icon: icon,
	apple: apple
});

interface ProductLayoutProps {
	children: React.ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
	return <LearningProductLayout>{children}</LearningProductLayout>;
}
