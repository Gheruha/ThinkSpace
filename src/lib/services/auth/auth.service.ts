import {
	SignInWithOtpDto,
	ResetPasswordDto,
	SignInDto,
	SignUpDto,
	VerifyOTPDto
} from '@/lib/dto/auth/auth.dto';

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

	async signInWithOtp(signInWithOtpData: SignInWithOtpDto): Promise<{ message: string }> {
		try {
			const response = await fetch('/api/auth/signInWithOtp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(signInWithOtpData)
			});

			const data = await response.json();

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to handle sign in with otp');
			}

			if (data.userData) {
				localStorage.setItem('userData', JSON.stringify(data.userData));
			}

			return data;
		} catch (error: any) {
			console.error('Error sign in with otp:', error.message);
			throw error;
		}
	}

	async verifyOTP(verifyOTPData: VerifyOTPDto): Promise<{ message: string }> {
		try {
			const response = await fetch('/api/auth/verifyOTP', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(verifyOTPData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to handle verify otp');
			}

			return response.json();
		} catch (error: any) {
			console.error('Error verify otp:', error.message);
			throw error;
		}
	}

	async resetPassword(resetPasswordData: ResetPasswordDto): Promise<{ message: string }> {
		try {
			const response = await fetch('/api/auth/resetPassword', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(resetPasswordData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to handle reset password');
			}

			return response.json();
		} catch (error: any) {
			console.error('Error verify otp:', error.message);
			throw error;
		}
	}

	async signInWithGoogle(): Promise<void> {
		try {
			window.location.href = '/api/auth/googleOAuth';
		} catch (error: any) {
			console.error('Error sign in with oauth:', error.message);
			throw error;
		}
	}
}

export const authService = new AuthService();
