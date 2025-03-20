import { Metadata } from 'next';

interface PageMetadata {
	title: string;
	description?: string;
	url: string;
	icon?: string;
	apple?: string;
}

export function getMetadata({ title, description, url, icon, apple }: PageMetadata): Metadata {
	return {
		title: `${title} | Think Space`,
		description: description || 'Organize your life quickly and easily',
		openGraph: {
			title: `${title} | Think Space`,
			description: description || 'Organize your life quickly and easily',
			url: url,
			siteName: 'Think Space',
			type: 'website'
		},
		icons: {
			icon: icon,
			apple: apple
		}
	};
}
