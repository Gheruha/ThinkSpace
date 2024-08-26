import { ButtonProvider } from '@/app/product/components/clickedButton';
import LearningProductLayout from './layouts/layout';

export default function TestingLayout({ children }: { children: React.ReactNode }) {
	return (
		<ButtonProvider>
			<LearningProductLayout>{children}</LearningProductLayout>
		</ButtonProvider>
	);
}
