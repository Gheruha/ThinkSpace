export default function Login() {
	return (
		<div>
			<form action="/auth/signup" method="post">
				<label htmlFor="email">Email:</label>
				<input id="email" name="email" type="email" required />
				<label htmlFor="password">Password:</label>
				<input id="password" name="password" type="password" required />
				<button>Sign Up</button>
			</form>

			<form action="/auth/signin" method="post">
				<label htmlFor="email">Email:</label>
				<input id="email" name="email" type="email" required />
				<label htmlFor="password">Password:</label>
				<input id="password" name="password" type="password" required />
				<button>Sign in</button>
			</form>
		</div>
	);
}
