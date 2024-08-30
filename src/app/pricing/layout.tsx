import { ButtonProvider } from '@/app/product/components/clickedButton';
import LearningProductLayout from '@/lib/layouts/product/layout';

export default function PricingLayout({ children }: { children: React.ReactNode }) {
	return (
		<ButtonProvider>
			<LearningProductLayout>{children}</LearningProductLayout>
		</ButtonProvider>
	);
}
