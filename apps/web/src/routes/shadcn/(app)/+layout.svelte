<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { profile, getUserIdeas } from '$lib/mock/launchpad';
	import RocketIcon from '@lucide/svelte/icons/rocket';
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import UserIcon from '@lucide/svelte/icons/user';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import SearchIcon from '@lucide/svelte/icons/search';

	let { children }: { children: import('svelte').Snippet } = $props();

	const navItems = [
		{ href: '/shadcn/ideas', label: 'Discover', icon: LightbulbIcon },
		{ href: '/shadcn/ideas?sort=trending', label: 'Trending', icon: TrendingUpIcon },
		{ href: '/shadcn/profile', label: 'Profile', icon: UserIcon },
		{ href: '/shadcn/settings', label: 'Settings', icon: SettingsIcon }
	];

	const userIdeas = getUserIdeas();
	const totalVotes = userIdeas.reduce((sum, idea) => sum + idea.votes, 0);
	const totalComments = userIdeas.reduce((sum, idea) => sum + idea.comments, 0);

	function isItemActive(href: string) {
		const [pathname, query] = href.split('?');
		if (pathname !== page.url.pathname) return false;
		if (!query) return true;

		const params = new URLSearchParams(query);
		return [...params.entries()].every(([key, value]) => page.url.searchParams.get(key) === value);
	}
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
								isActive={isItemActive(item.href)}
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
			<div class="mb-3 rounded-lg border border-sidebar-border p-3 group-data-[collapsible=icon]:hidden">
				<div class="flex items-center gap-3">
					<Avatar.Root class="size-10">
						<Avatar.Fallback class="bg-violet-100 font-semibold text-violet-700">JD</Avatar.Fallback>
					</Avatar.Root>
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-semibold">{profile.name}</p>
						<p class="text-muted-foreground truncate text-xs">{profile.email}</p>
					</div>
				</div>
				<div class="text-muted-foreground mt-3 grid grid-cols-3 gap-2 text-center text-xs">
					<div>
						<p class="text-foreground font-semibold">{userIdeas.length}</p>
						<p>Ideas</p>
					</div>
					<div>
						<p class="text-foreground font-semibold">{totalVotes}</p>
						<p>Votes</p>
					</div>
					<div>
						<p class="text-foreground font-semibold">{totalComments}</p>
						<p>Comments</p>
					</div>
				</div>
			</div>
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
				<Button href="/shadcn/profile" variant="ghost" size="sm">Profile</Button>
				<Button href="/shadcn/settings" size="sm" class="bg-violet-600 hover:bg-violet-700"
					>Account Settings</Button
				>
			</div>
		</header>

		<div class="flex flex-1 flex-col gap-6 p-6">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
