'use client';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
	const [data, setData] = useState<{ email: string; password: string }>({
		email: '',
		password: ''
	});

	const signUp = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			let { data: loginData, error } = await supabase.auth.signUp({
				email: data.email,
				password: data.password
			});

			if (loginData) {
				console.log(loginData);
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
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col w-full items-center gap-2 ">
			<form className="flex flex-col w-2/4 text-foreground">
				<label className="text-md" htmlFor="email">
					Email
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
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
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					type="password"
					name="password"
					placeholder="••••••••"
					required
					value={data.password}
					onChange={(e) => setData((prevData) => ({ ...prevData, password: e.target.value }))}
				/>
				<button
					className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
					onClick={(e) => signUp(e)}
				>
					Sign Up
				</button>
				<button
					className="border bg-violet-700 text-white border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
					onClick={(e) => signIn(e)}
				>
					Sign In
				</button>
			</form>
		</div>
	);
}
