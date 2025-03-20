import {
	SignInDto,
	SignUpDto,
	SignInWithOtpDto,
	VerifyOtpDto,
	ResetPasswordDto
} from '@/types/auth.type';

type ApiResponse<T = { message: string }> = T;

class AuthService {
	// Template for fetching endpoints
	private async fetchApi<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
		try {
			const response = await fetch(`/api/auth/${endpoint}`, {
				...options,
				headers: { 'Content-Type': 'application/json', ...options.headers }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to ${endpoint} failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in ${endpoint}:`, (error as Error).message);
			throw error;
		}
	}

	// Sends a POST request to sign in the user
	async signIn(payload: SignInDto): Promise<ApiResponse> {
		return this.fetchApi('signIn', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	// Sends a POST request to sign up a new user
	async signUp(payload: SignUpDto): Promise<ApiResponse> {
		return this.fetchApi('signUp', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	// Sends a POST request to sign out the user
	async signOut(): Promise<ApiResponse> {
		return this.fetchApi('signOut', { method: 'POST' });
	}

	// Sends a POST request to sign in the user using OTP
	async signInWithOtp(payload: SignInWithOtpDto): Promise<ApiResponse> {
		const data: any = await this.fetchApi('signInWithOtp', {
			method: 'POST',
			body: JSON.stringify(payload)
		});

		if (data.userData) {
			localStorage.setItem('userData', JSON.stringify(data.userData));
		}

		return data;
	}

	// Sends a POST request to verify the OTP during the sign-in process
	async verifyOtp(payload: VerifyOtpDto): Promise<ApiResponse> {
		return this.fetchApi('verifyOTP', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	// Sends a POST request to reset the user's password
	async resetPassword(payload: ResetPasswordDto): Promise<ApiResponse> {
		return this.fetchApi('resetPassword', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	// Redirects the user to the Google OAuth sign-in route
	async signInWithGoogle(): Promise<void> {
		window.location.href = '/api/auth/googleOAuth';
	}
}

export const authService = new AuthService();
