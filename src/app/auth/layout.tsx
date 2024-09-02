import { ButtonProvider } from '@/app/product/components/clickedButton';
import { Toaster } from '@/components/ui/toaster';
import { BlurProvider } from './components/blur';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<ButtonProvider>
			<BlurProvider>{children}</BlurProvider>
			<Toaster />
		</ButtonProvider>
	);
}
