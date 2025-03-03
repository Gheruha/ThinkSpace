import {
	SignInDto,
	SignUpDto,
	SignInWithOtpDto,
	VerifyOTPDto,
	ResetPasswordDto
} from '@/lib/dto/auth/auth.dto';

type ApiResponse<T = { message: string }> = T;

class AuthService {
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

	async signIn(payload: SignInDto): Promise<ApiResponse> {
		return this.fetchApi('signIn', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	async signUp(payload: SignUpDto): Promise<ApiResponse> {
		return this.fetchApi('signUp', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	async signOut(): Promise<ApiResponse> {
		return this.fetchApi('signOut', { method: 'POST' });
	}

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

	async verifyOtp(payload: VerifyOTPDto): Promise<ApiResponse> {
		return this.fetchApi('verifyOTP', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	async resetPassword(payload: ResetPasswordDto): Promise<ApiResponse> {
		return this.fetchApi('resetPassword', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	async signInWithGoogle(): Promise<void> {
		window.location.href = '/api/auth/googleOAuth';
	}
}

export const authService = new AuthService();
