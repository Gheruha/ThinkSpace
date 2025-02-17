import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';

export default function NewPageForm() {
	return (
		<form action="/api/workspace/newPage" method="POST">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">New Page</CardTitle>
					<CardDescription>Complete the fields in order to create a new page.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="Title">Page Title:</Label>
							<Input name="Title" placeholder="Basic page"></Input>
						</div>
						<div className="grid gap-2">
							<Button>Create</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
