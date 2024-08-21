'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
	const router = useRouter();
	const [data, setData] = useState<{ email: string; password: string }>({
		email: '',
		password: ''
	});

	useEffect(() => {
		const checkSession = async () => {
			const {
				data: { session }
			} = await supabase.auth.getSession();

			if (session) {
				router.push('/');
			}
		};
		checkSession();
	}, [router]);

	const signUp = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			let { data: loginData, error } = await supabase.auth.signUp({
				email: data.email,
				password: data.password
			});

			if (loginData) {
				console.log(loginData);
				router.refresh();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const signIn = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			let { data: loginData, error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password
			});

			if (loginData) {
				console.log(loginData);
				router.refresh();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col w-full h-[100vh] justify-center border items-center gap-2 p-10">
			<form className="login">
				<label className="text-md" htmlFor="email">
					Email
				</label>
				<input
					className="login-input-text"
					name="email"
					placeholder="you@example.com"
					required
					value={data.email}
					onChange={(e) => setData((prevData) => ({ ...prevData, email: e.target.value }))}
				/>
				<label className="text-md" htmlFor="password">
					Password
				</label>
				<input
					className="login-input-text"
					type="password"
					name="password"
					placeholder="••••••••"
					required
					value={data.password}
					onChange={(e) => setData((prevData) => ({ ...prevData, password: e.target.value }))}
				/>
				<button
					className="border bg-violet-700 text-white border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
					onClick={(e) => signUp(e)}
				>
					Sign Up
				</button>
				<button
					className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
					onClick={(e) => signIn(e)}
				>
					Sign In
				</button>
			</form>
		</div>
	);
}
