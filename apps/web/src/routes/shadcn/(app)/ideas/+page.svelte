<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import ThumbsUpIcon from '@lucide/svelte/icons/thumbs-up';
	import MessageSquareIcon from '@lucide/svelte/icons/message-square';
	import ClockIcon from '@lucide/svelte/icons/clock';

	const CATEGORIES = [
		'All',
		'FinTech',
		'EdTech',
		'AgriTech',
		'HealthTech',
		'Developer Tools',
		'E-commerce',
		'Productivity',
		'Smart Home'
	];

	const IDEAS = [
		{
			id: '1',
			title: 'AI-Powered Code Review Assistant',
			category: 'Developer Tools',
			description:
				'An intelligent tool that automatically reviews pull requests, identifies potential bugs, suggests improvements, and ensures code quality standards are met across the entire codebase.',
			votes: 234,
			comments: 45,
			author: 'Sarah Chen',
			time: '2 hours ago'
		},
		{
			id: '2',
			title: 'Sustainable Fashion Marketplace',
			category: 'E-commerce',
			description:
				'A platform connecting eco-conscious consumers with verified sustainable fashion brands. Features carbon footprint tracking, material transparency, and ethical manufacturing verification.',
			votes: 189,
			comments: 32,
			author: 'Marcus Johnson',
			time: '5 hours ago'
		},
		{
			id: '3',
			title: 'Remote Team Wellness Platform',
			category: 'HealthTech',
			description:
				'Comprehensive wellness solution for remote teams including virtual fitness classes, mental health resources, team challenges, and personalized health tracking.',
			votes: 156,
			comments: 28,
			author: 'Emily Rodriguez',
			time: '8 hours ago'
		},
		{
			id: '4',
			title: 'Smart Home Energy Optimizer',
			category: 'Smart Home',
			description:
				'IoT solution that learns your energy usage patterns and automatically adjusts smart home devices to minimize electricity costs while maintaining comfort.',
			votes: 142,
			comments: 19,
			author: 'David Kim',
			time: '12 hours ago'
		},
		{
			id: '5',
			title: 'Local Food Network App',
			category: 'AgriTech',
			description:
				'Connect home cooks with neighbors to share homemade meals, reduce food waste, and build community. Features dietary filters, rating system, and secure payments.',
			votes: 127,
			comments: 41,
			author: 'Priya Patel',
			time: '1 day ago'
		},
		{
			id: '6',
			title: 'Freelancer Financial Dashboard',
			category: 'FinTech',
			description:
				'All-in-one financial management for freelancers with invoice tracking, expense categorization, tax estimation, and automated bookkeeping.',
			votes: 98,
			comments: 15,
			author: 'Alex Turner',
			time: '1 day ago'
		},
		{
			id: '7',
			title: 'Peer-to-Peer Tutoring Marketplace',
			category: 'EdTech',
			description:
				'Connect students with verified peer tutors across subjects. Features scheduling, video sessions, session recordings, and a reputation-based matching system.',
			votes: 76,
			comments: 12,
			author: 'Amara Diallo',
			time: '2 days ago'
		}
	];

	let selectedCategory = $state('All');
	let sort = $state('newest');

	const filtered = $derived(
		IDEAS.filter((i) => selectedCategory === 'All' || i.category === selectedCategory).sort(
			(a, b) => {
				if (sort === 'most-voted') return b.votes - a.votes;
				if (sort === 'most-commented') return b.comments - a.comments;
				return 0;
			}
		)
	);
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold tracking-tight">Discover Ideas</h1>
		<p class="text-muted-foreground mt-1 text-sm">
			Browse inspiring startup concepts and join the conversation.
		</p>
	</div>

	<!-- Category + Sort filters -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-wrap gap-2">
			{#each CATEGORIES as cat}
				<Button
					variant={selectedCategory === cat ? 'default' : 'outline'}
					size="sm"
					onclick={() => (selectedCategory = cat)}
					class={selectedCategory === cat ? 'bg-violet-600 hover:bg-violet-700' : ''}
				>
					{cat}
				</Button>
			{/each}
		</div>

		<Select.Root bind:value={sort}>
			<Select.Trigger class="w-44 shrink-0">
				<Select.Value placeholder="Sort by" />
			</Select.Trigger>
			<Select.Portal>
				<Select.Content>
					<Select.Item value="newest" label="Newest" />
					<Select.Item value="most-voted" label="Most Voted" />
					<Select.Item value="most-commented" label="Most Commented" />
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	</div>

	<Separator />

	<!-- Ideas grid -->
	{#if filtered.length > 0}
		<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{#each filtered as idea (idea.id)}
				<Card.Root class="flex flex-col transition-shadow hover:shadow-md">
					<Card.Header class="pb-2">
						<div class="flex items-start justify-between gap-2">
							<Card.Title class="text-base leading-snug">
								<a href="/shadcn/ideas/{idea.id}" class="hover:text-violet-600 hover:underline">
									{idea.title}
								</a>
							</Card.Title>
							<span
								class="shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700"
							>
								{idea.category}
							</span>
						</div>
					</Card.Header>

					<Card.Content class="text-muted-foreground flex-1 text-sm">
						{idea.description}
					</Card.Content>

					<Card.Footer
						class="text-muted-foreground flex items-center gap-4 border-t pt-3 text-sm"
					>
						<span class="flex items-center gap-1">
							<ThumbsUpIcon class="size-4" />
							{idea.votes}
						</span>
						<span class="flex items-center gap-1">
							<MessageSquareIcon class="size-4" />
							{idea.comments}
						</span>
						<span class="ml-auto flex items-center gap-1 text-xs">
							<ClockIcon class="size-3" />
							{idea.time}
						</span>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	{:else}
		<div class="text-muted-foreground py-16 text-center">
			No ideas found for <strong>{selectedCategory}</strong>.
		</div>
	{/if}
</div>
