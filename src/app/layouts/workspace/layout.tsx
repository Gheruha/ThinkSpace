'use client';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<header></header>
			<main>{children}</main>
			<footer></footer>
		</div>
	);
}
