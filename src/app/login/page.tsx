export default function Login() {
	return (
		<form action="/auth/signup" method="post">
			<label htmlFor="email">Email:</label>
			<input id="email" name="email" type="email" required />
			<label htmlFor="password">Password:</label>
			<input id="password" name="password" type="password" required />
			<button>Sign Up</button>
		</form>
	);
}
