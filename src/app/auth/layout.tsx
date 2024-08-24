import { ButtonProvider } from '@/app/product/components/clickedButton';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <ButtonProvider>{children}</ButtonProvider>;
}
