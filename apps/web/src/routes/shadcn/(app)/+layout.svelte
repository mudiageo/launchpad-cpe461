<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import RocketIcon from '@lucide/svelte/icons/rocket';
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import UserIcon from '@lucide/svelte/icons/user';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import SearchIcon from '@lucide/svelte/icons/search';

	let { children }: { children: import('svelte').Snippet } = $props();

	const navItems = [
		{ href: '/shadcn/ideas', label: 'Discover', icon: LightbulbIcon },
		{ href: '/shadcn/ideas?sort=trending', label: 'Trending', icon: TrendingUpIcon },
		{ href: '/shadcn/profile', label: 'Profile', icon: UserIcon }
	];
</script>

<Sidebar.Provider>
	<Sidebar.Root collapsible="icon">
		<Sidebar.Header>
			<div class="flex items-center gap-2 px-2 py-1.5">
				<RocketIcon class="size-5 shrink-0 text-violet-600" />
				<span class="truncate font-bold group-data-[collapsible=icon]:hidden">Launchpad</span>
			</div>
		</Sidebar.Header>

		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
				<Sidebar.Menu>
					{#each navItems as item}
						{@const Icon = item.icon}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								isActive={page.url.pathname === item.href.split('?')[0]}
								tooltipContent={item.label}
							>
								{#snippet child({ props })}
									<a href={item.href} {...props}>
										<Icon />
										<span>{item.label}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.Group>
		</Sidebar.Content>

		<Sidebar.Footer>
			<Button
				href="/shadcn/ideas/new"
				class="w-full group-data-[collapsible=icon]:hidden bg-violet-600 hover:bg-violet-700"
			>
				<PlusIcon class="size-4" />
				New Idea
			</Button>
			<Button
				href="/shadcn/ideas/new"
				variant="ghost"
				size="icon"
				class="hidden group-data-[collapsible=icon]:flex"
			>
				<PlusIcon class="size-4" />
			</Button>
		</Sidebar.Footer>

		<Sidebar.Rail />
	</Sidebar.Root>

	<Sidebar.Inset>
		<header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-1 h-4" />
			<div class="relative max-w-sm flex-1">
				<SearchIcon
					class="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
				/>
				<Input placeholder="Search ideas..." class="pl-9" />
			</div>
			<div class="ml-auto flex items-center gap-2">
				<Button href="/shadcn/login" variant="ghost" size="sm">Log in</Button>
				<Button href="/shadcn/signup" size="sm" class="bg-violet-600 hover:bg-violet-700"
					>Sign up</Button
				>
			</div>
		</header>

		<div class="flex flex-1 flex-col gap-6 p-6">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
