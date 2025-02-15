import { render } from '@testing-library/react';
import { SignInForm } from '@/app/auth/components/authentication/signInForm';
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
	render(<SignInForm />);

	// Expectation
	// ...
});
