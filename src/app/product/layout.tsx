import { ButtonProvider } from '@/app/product/components/clickedButton';
import LearningProductLayout from '@/app/layouts/product/layout';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<ButtonProvider>
			<LearningProductLayout>{children}</LearningProductLayout>
		</ButtonProvider>
	);
}
