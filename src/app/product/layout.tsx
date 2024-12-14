import { ButtonProvider } from '@/components/clickedButton';
import LearningProductLayout from '@/lib/layouts/marketing';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<ButtonProvider>
			<LearningProductLayout>{children}</LearningProductLayout>
		</ButtonProvider>
	);
}
