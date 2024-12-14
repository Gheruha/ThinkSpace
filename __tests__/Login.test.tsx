import { render } from '@testing-library/react';
import { ButtonProvider } from '@/components/clickedButton';
import { LoginForm } from '@/app/auth/components/forms/log_in';
import { useRouter } from 'next/navigation';

// Mocking the useRouter
jest.mock('next/navigation', () => ({
	useRouter: jest.fn()
}));

it('should show the Auth page', () => {
	// Simulating the useRouter in testing environment
	const routerPush = jest.fn();

	(useRouter as jest.Mock).mockReturnValue({
		push: routerPush
	});

	// Virtual DOM
	render(
		<ButtonProvider>
			<LoginForm />
		</ButtonProvider>
	);

	// Expectation
	// ...
});
