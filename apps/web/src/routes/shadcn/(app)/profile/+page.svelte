<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import ThumbsUpIcon from '@lucide/svelte/icons/thumbs-up';
	import MessageSquareIcon from '@lucide/svelte/icons/message-square';
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import PencilIcon from '@lucide/svelte/icons/pencil';
	import PlusIcon from '@lucide/svelte/icons/plus';

	let ideas = $state([
		{
			id: '1',
			title: 'AI-Powered Code Review Assistant',
			category: 'Developer Tools',
			description:
				'An intelligent tool that automatically reviews pull requests, identifies potential bugs, suggests improvements, and ensures code quality standards are met.',
			votes: 234,
			comments: 45,
			time: '2 hours ago'
		},
		{
			id: '6',
			title: 'Freelancer Financial Dashboard',
			category: 'FinTech',
			description:
				'All-in-one financial management for freelancers with invoice tracking, expense categorization, tax estimation, and automated bookkeeping.',
			votes: 98,
			comments: 15,
			time: '1 day ago'
		}
	]);

	function deleteIdea(id: string) {
		if (confirm('Delete this idea? This cannot be undone.')) {
			ideas = ideas.filter((i) => i.id !== id);
		}
	}

	const totalVotes = $derived(ideas.reduce((sum, i) => sum + i.votes, 0));
	const totalComments = $derived(ideas.reduce((sum, i) => sum + i.comments, 0));
</script>

<div class="space-y-6">
	<!-- Profile header -->
	<div class="flex items-center gap-4">
		<Avatar.Root class="size-16">
			<Avatar.Fallback class="bg-violet-100 text-xl font-bold text-violet-700">Y</Avatar.Fallback>
		</Avatar.Root>
		<div>
			<h1 class="text-xl font-bold">You</h1>
			<p class="text-muted-foreground text-sm">Member since March 2026</p>
		</div>
	</div>

	<!-- Stats row -->
	<div class="grid grid-cols-3 gap-4">
		<Card.Root>
			<Card.Content class="flex flex-col items-center gap-1 py-4">
				<LightbulbIcon class="size-5 text-violet-600" />
				<span class="text-2xl font-bold">{ideas.length}</span>
				<span class="text-muted-foreground text-xs">Ideas</span>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Content class="flex flex-col items-center gap-1 py-4">
				<ThumbsUpIcon class="size-5 text-violet-600" />
				<span class="text-2xl font-bold">{totalVotes}</span>
				<span class="text-muted-foreground text-xs">Total Votes</span>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Content class="flex flex-col items-center gap-1 py-4">
				<MessageSquareIcon class="size-5 text-violet-600" />
				<span class="text-2xl font-bold">{totalComments}</span>
				<span class="text-muted-foreground text-xs">Comments</span>
			</Card.Content>
		</Card.Root>
	</div>

	<Separator />

	<div class="flex items-center justify-between">
		<h2 class="font-semibold">My Ideas</h2>
		<Button href="/shadcn/ideas/new" size="sm" class="bg-violet-600 hover:bg-violet-700">
			<PlusIcon class="size-4" />
			New Idea
		</Button>
	</div>

	{#if ideas.length === 0}
		<div class="text-muted-foreground py-16 text-center">
			<LightbulbIcon class="mx-auto mb-3 size-10 opacity-30" />
			<p>No ideas yet. Share your first concept!</p>
			<Button href="/shadcn/ideas/new" class="mt-4 bg-violet-600 hover:bg-violet-700">
				Submit an idea
			</Button>
		</div>
	{/if}

	<div class="space-y-4">
		{#each ideas as idea (idea.id)}
			<Card.Root>
				<Card.Header class="pb-2">
					<div class="flex items-start justify-between gap-2">
						<div class="space-y-1">
							<span
								class="inline-block rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700"
							>
								{idea.category}
							</span>
							<Card.Title class="text-base">
								<a href="/shadcn/ideas/{idea.id}" class="hover:text-violet-600 hover:underline">
									{idea.title}
								</a>
							</Card.Title>
						</div>
						<div class="flex shrink-0 gap-1">
							<Button variant="ghost" size="icon-sm" title="Edit">
								<PencilIcon class="size-3.5" />
							</Button>
							<Button
								variant="ghost"
								size="icon-sm"
								title="Delete"
								onclick={() => deleteIdea(idea.id)}
								class="text-destructive hover:text-destructive"
							>
								<Trash2Icon class="size-3.5" />
							</Button>
						</div>
					</div>
				</Card.Header>

				<Card.Content class="text-muted-foreground pb-2 text-sm">
					{idea.description}
				</Card.Content>

				<Card.Footer class="text-muted-foreground flex items-center gap-4 border-t pt-3 text-sm">
					<span class="flex items-center gap-1">
						<ThumbsUpIcon class="size-4" />
						{idea.votes}
					</span>
					<span class="flex items-center gap-1">
						<MessageSquareIcon class="size-4" />
						{idea.comments}
					</span>
					<span class="ml-auto text-xs">{idea.time}</span>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
