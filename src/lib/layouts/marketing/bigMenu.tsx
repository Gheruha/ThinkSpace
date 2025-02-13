'use client';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { AboutFeatures } from './aboutFeatures';
import { ResourcesFeatures } from './resourcesFeatures';

export const BigMenu = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuTrigger>About</NavigationMenuTrigger>
				<NavigationMenuContent>
					<div className="py-8 px-28">
						<AboutFeatures />
					</div>
				</NavigationMenuContent>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
				<NavigationMenuContent>
					<div className="py-8 px-28">
						<ResourcesFeatures />
					</div>
				</NavigationMenuContent>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<Link href="/pricing" legacyBehavior passHref>
					<NavigationMenuLink>
						<span className="text-lg font-normal">Pricing</span>
					</NavigationMenuLink>
				</Link>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);
