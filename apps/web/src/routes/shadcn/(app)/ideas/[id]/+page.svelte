<script lang="ts">
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { getIdeaById } from '$lib/mock/launchpad';
	import ThumbsUpIcon from '@lucide/svelte/icons/thumbs-up';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import MessageSquareIcon from '@lucide/svelte/icons/message-square';
	import SendIcon from '@lucide/svelte/icons/send';

	const selectedIdea = getIdeaById(page.params.id) ?? getIdeaById('1');

	const idea = {
		id: selectedIdea?.id ?? page.params.id,
		title: selectedIdea?.title ?? 'Idea not found',
		category: selectedIdea?.category ?? 'Uncategorized',
		author: selectedIdea?.author ?? 'Unknown author',
		time: selectedIdea?.time ?? 'Unknown time',
		votes: selectedIdea?.votes ?? 0,
		summary: selectedIdea?.description ?? 'No summary available.',
		description: selectedIdea?.fullDescription ?? 'No detailed description available.',
		features: selectedIdea?.features ?? []
	};

	type Comment = { author: string; time: string; body: string };

	let comments = $state<Comment[]>([
		{
			author: 'Michael Torres',
			time: '1 hour ago',
			body: 'Love the concept — will this support VS Code extensions for inline suggestions?'
		},
		{
			author: 'Jessica Wu',
			time: '3 hours ago',
			body: 'How do you plan to reduce false positives? Too many can make developers ignore the tool.'
		},
		{
			author: "Ryan O'Connor",
			time: 'Yesterday',
			body: 'Looks like it overlaps with SonarQube in some areas. What sets it apart?'
		}
	]);

	let voteCount = $state(idea.votes);
	let voted = $state(false);
	let commentText = $state('');

	function toggleVote() {
		voted = !voted;
		voteCount += voted ? 1 : -1;
	}

	function submitComment(e: SubmitEvent) {
		e.preventDefault();
		const text = commentText.trim();
		if (!text) return;
		comments.push({ author: 'You', time: 'Just now', body: text });
		commentText = '';
	}
</script>

<div class="mx-auto max-w-3xl space-y-6">
	<Button href="/shadcn/ideas" variant="ghost" size="sm" class="-ml-2">
		<ArrowLeftIcon class="size-4" />
		Back to ideas
	</Button>

	<!-- Idea detail card -->
	<Card.Root>
		<Card.Header>
			<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div class="space-y-1">
					<span
						class="inline-block rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700"
					>
						{idea.category}
					</span>
					<Card.Title class="text-2xl">{idea.title}</Card.Title>
					<Card.Description>by {idea.author} · {idea.time}</Card.Description>
				</div>
				<Button
					variant={voted ? 'default' : 'outline'}
					size="sm"
					onclick={toggleVote}
					class="shrink-0 {voted ? 'bg-violet-600 hover:bg-violet-700' : ''}"
				>
					<ThumbsUpIcon class="size-4" />
					{voteCount}
				</Button>
			</div>
		</Card.Header>

		<Card.Content class="space-y-4">
			<p class="font-medium">{idea.summary}</p>
			<p class="text-muted-foreground text-sm">{idea.description}</p>

			<div>
				<h3 class="mb-3 font-semibold">Key features</h3>
				<ul class="space-y-2">
					{#each idea.features as feature}
						<li class="flex items-start gap-2 text-sm">
							<span class="mt-0.5 shrink-0 text-violet-500">•</span>
							<span class="text-muted-foreground">{feature}</span>
						</li>
					{/each}
				</ul>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Comments -->
	<Card.Root>
		<Card.Header>
			<Card.Title class="flex items-center gap-2 text-base">
				<MessageSquareIcon class="size-4" />
				Comments ({comments.length})
			</Card.Title>
		</Card.Header>

		<Card.Content class="space-y-4">
			{#each comments as comment, i}
				{#if i > 0}
					<Separator />
				{/if}
				<div class="flex gap-3">
					<Avatar.Root class="size-8 shrink-0">
						<Avatar.Fallback class="text-xs">{comment.author[0]}</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex-1 space-y-1">
						<div class="flex items-center gap-2 text-sm">
							<span class="font-semibold">{comment.author}</span>
							<span class="text-muted-foreground text-xs">{comment.time}</span>
						</div>
						<p class="text-muted-foreground text-sm">{comment.body}</p>
					</div>
				</div>
			{/each}

			<Separator />

			<form onsubmit={submitComment} class="flex gap-2">
				<Textarea
					placeholder="Add a comment..."
					bind:value={commentText}
					rows={2}
					class="flex-1 resize-none"
				/>
				<Button
					type="submit"
					size="icon"
					disabled={!commentText.trim()}
					class="self-end bg-violet-600 hover:bg-violet-700"
				>
					<SendIcon class="size-4" />
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
