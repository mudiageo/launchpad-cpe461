<script lang="ts">
	import { page } from '$app/state';

	let { children }: { children: import('svelte').Snippet } = $props();

	const navItems = [
		{ href: '/', label: 'All Ideas' },
		{ href: '/categories', label: 'Categories' },
		{ href: '/trending', label: 'Trending' },
		{ href: '/my-ideas', label: 'My Ideas' }
	];
</script>

<div class="min-h-screen bg-gray-100 text-gray-800">
	<!-- Navbar -->
	<nav class="flex items-center border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
		<div class="flex-1"></div>
		<input
			type="text"
			placeholder="Search ideas..."
			class="max-w-sm flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none"
		/>
		<div class="flex flex-1 items-center justify-end gap-4">
			<a href="/signup" class="text-sm font-semibold text-blue-600 hover:underline">Sign Up</a>
			<div
				class="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-black/10 text-lg hover:bg-black/20"
				title="Profile"
			>
				👤
			</div>
		</div>
	</nav>

	<div class="flex" style="min-height: calc(100vh - 65px)">
		<!-- Sidebar -->
		<aside class="flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white p-6">
			<h2 class="mb-6 text-lg font-bold text-gray-900">Launchpad</h2>
			<nav>
				<ul class="m-0 list-none space-y-3 p-0">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								class={page.url.pathname === item.href
									? 'font-bold text-gray-900'
									: 'font-medium text-gray-500 hover:text-gray-700'}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<a
				href="/submit"
				class="mt-6 block w-full rounded-xl bg-violet-600 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-violet-700"
			>
				+ New Idea
			</a>
		</aside>

		<!-- Main Content -->
		<main class="flex-1 p-6">
			{@render children()}
		</main>
	</div>

	<!-- FAB (mobile) -->
	<a
		href="/submit"
		aria-label="Add new idea"
		class="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white shadow-lg hover:bg-violet-700 md:hidden"
	>
		+
	</a>
</div>
