<script lang="ts">
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { categories, ideas } from '$lib/mock/launchpad';
	import ThumbsUpIcon from '@lucide/svelte/icons/thumbs-up';
	import MessageSquareIcon from '@lucide/svelte/icons/message-square';
	import ClockIcon from '@lucide/svelte/icons/clock';

	let selectedCategory = $state('All');
	let sort = $state(page.url.searchParams.get('sort') === 'trending' ? 'most-voted' : 'newest');

	const filtered = $derived(
		ideas.filter((i) => selectedCategory === 'All' || i.category === selectedCategory).sort(
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
			{#each categories as cat}
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
				{sort === 'newest'
					? 'Newest'
					: sort === 'most-voted'
						? 'Most Voted'
						: 'Most Commented'}
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
							by {idea.author} · {idea.time}
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
