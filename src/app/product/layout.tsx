import { ButtonProvider } from '@/app/product/components/clickedButton';
import LearningProductLayout from '@/lib/layouts/product/layout';
import Gradient from './ShaderGradient';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<ButtonProvider>
			<div className="dark">
				<Gradient />
				<LearningProductLayout>{children}</LearningProductLayout>
			</div>
		</ButtonProvider>
	);
}
