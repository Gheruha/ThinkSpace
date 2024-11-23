import { Button } from '@/components/ui/button';

export default function Main() {
	return (
		<div>
			<form action="/api/auth/signOut" method="post">
				<Button size="xs" className="rounded-sm" variant="ghost">
					<span className="text-lg font-normal">Log Out</span>
				</Button>
			</form>
		</div>
	);
}
