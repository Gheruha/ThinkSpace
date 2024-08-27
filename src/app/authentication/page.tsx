'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import { LoginForm } from './components/log_in';
import { SignUpForm } from './components/sign_up';
import { useButtonContext } from '../product/components/clickedButton';

export default function Auth() {
	const router = useRouter();
	const [data, setData] = useState<{
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	}>({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	});

	const { clickedButton } = useButtonContext();

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
				// firstName: data.firstName,
				// lastName: data.lastName,
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

	const logIn = async (e: React.FormEvent) => {
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
		<div className="flex justify-center items-center h-screen">
			{clickedButton === 'Sign Up' ? (
				<SignUpForm
					firstName={data.firstName}
					setFirstName={(e) => setData((prevData) => ({ ...prevData, firstName: e.target.value }))}
					lastName={data.lastName}
					setLastName={(e) => setData((prevData) => ({ ...prevData, lastName: e.target.value }))}
					email={data.email}
					setEmail={(e) => setData((prevData) => ({ ...prevData, email: e.target.value }))}
					password={data.password}
					setPassword={(e) => setData((prevData) => ({ ...prevData, password: e.target.value }))}
					signUp={(e) => signUp(e)}
				/>
			) : (
				<LoginForm
					email={data.email}
					setEmail={(e) => setData((prevData) => ({ ...prevData, email: e.target.value }))}
					password={data.password}
					setPassword={(e) => setData((prevData) => ({ ...prevData, password: e.target.value }))}
					logIn={(e) => logIn(e)}
				/>
			)}
		</div>
	);
}
