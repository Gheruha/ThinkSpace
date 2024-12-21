import { ForgotPasswordDto, SignInDto, SignUpDto } from '@/lib/dto/auth/auth.dto';

class AuthService {
	async signIn(signInData: SignInDto): Promise<{ message: string }> {
		try {
			const response = await fetch('api/auth/signIn', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(signInData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to sign in');
			}

			return response.json();
		} catch (error: any) {
			console.error('Error signing in:', error.message);
			throw error;
		}
	}

	async signUp(signUpData: SignUpDto): Promise<{ message: string }> {
		try {
			const response = await fetch('api/auth/signUp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(signUpData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to sign up');
			}

			return response.json();
		} catch (error: any) {
			console.error('Error signing up:', error.message);
			throw error;
		}
	}

	async signOut(): Promise<{ message: string }> {
		try {
			const response = await fetch('api/auth/signOut', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to sign out');
			}

			return response.json();
		} catch (error: any) {
			console.error('Error signing out:', error.message);
			throw error;
		}
	}

	async forgotPassword(forgotPasswordData: ForgotPasswordDto): Promise<{ message: string }> {
		try {
			const response = await fetch('/api/auth/forgotPassword', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(forgotPasswordData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to handle forgot password');
			}

			return response.json();
		} catch (error: any) {
			console.error('Error forgot password:', error.message);
			throw error;
		}
	}
}

export const authService = new AuthService();
