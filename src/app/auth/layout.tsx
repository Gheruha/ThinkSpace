import { ButtonProvider } from '@/app/product/components/clickedButton';
import { Toaster } from '@/components/ui/toaster';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<ButtonProvider>
			{children} <Toaster />
		</ButtonProvider>
	);
}
