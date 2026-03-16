<script lang="ts">
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { categories, getIdeaById } from '$lib/mock/launchpad';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	const idea = getIdeaById(page.params.id) ?? getIdeaById('1');

	let title = $state(idea?.title ?? '');
	let category = $state(idea?.category ?? '');
	let shortDesc = $state(idea?.description ?? '');
	let fullDesc = $state(idea?.fullDescription ?? '');
	let deleted = $state(false);
	let updated = $state(false);

	const original = {
		title,
		category,
		shortDesc,
		fullDesc
	};

	const isDirty = $derived(
		title !== original.title ||
			category !== original.category ||
			shortDesc !== original.shortDesc ||
			fullDesc !== original.fullDesc
	);

	const isValid = $derived(
		title.trim().length > 0 &&
			category.trim().length > 0 &&
			shortDesc.trim().length > 0 &&
			fullDesc.trim().length > 0
	);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!isDirty || !isValid) return;
		updated = true;
	}

	function handleDelete() {
		if (confirm(`Delete "${title}"? This cannot be undone.`)) {
			deleted = true;
		}
	}
</script>

<div class="mx-auto max-w-2xl space-y-6">
	<Button href="/shadcn/profile" variant="ghost" size="sm" class="-ml-2">
		<ArrowLeftIcon class="size-4" />
		Back to profile
	</Button>

	{#if deleted}
		<Card.Root class="border-red-200 bg-red-50">
			<Card.Header>
				<Card.Title class="text-red-800">Idea deleted</Card.Title>
				<Card.Description class="text-red-700">
					The mock item was removed from this editing flow.
				</Card.Description>
			</Card.Header>
			<Card.Footer>
				<Button href="/shadcn/profile">Return to profile</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<div>
			<h1 class="text-2xl font-bold tracking-tight">Edit Idea</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				Update your idea details and content before publishing changes.
			</p>
		</div>

		<Card.Root>
			<Card.Content class="pt-6">
				<form onsubmit={handleSubmit} class="space-y-5">
					<div class="space-y-2">
						<Label for="idea-title">Idea Title</Label>
						<Input id="idea-title" bind:value={title} required />
					</div>

					<div class="space-y-2">
						<Label for="idea-category">Category</Label>
						<Select.Root bind:value={category}>
							<Select.Trigger class="w-full" id="idea-category">
								{category || 'Select a category'}
							</Select.Trigger>
							<Select.Portal>
								<Select.Content>
									{#each categories.filter((item) => item !== 'All') as option}
										<Select.Item value={option} label={option} />
									{/each}
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>

					<div class="space-y-2">
						<Label for="short-description">Short Description</Label>
						<Textarea id="short-description" rows={3} maxlength={200} bind:value={shortDesc} />
						<p class="text-muted-foreground text-xs">{shortDesc.length} characters</p>
					</div>

					<div class="space-y-2">
						<Label for="full-description">Full Description</Label>
						<Textarea id="full-description" rows={6} maxlength={1000} bind:value={fullDesc} />
						<p class="text-muted-foreground text-xs">{fullDesc.length} characters</p>
					</div>

					<div class="flex items-center justify-between gap-3 pt-2">
						<div>
							{#if updated}
								<p class="text-sm text-green-700">Idea updated locally.</p>
							{/if}
						</div>
						<div class="flex gap-3">
							<Button type="button" variant="outline" onclick={handleDelete}>Delete</Button>
							<Button variant="outline" href="/shadcn/profile">Cancel</Button>
							<Button
								type="submit"
								disabled={!isDirty || !isValid}
								class="bg-violet-600 hover:bg-violet-700 disabled:opacity-60"
							>
								Save Idea
							</Button>
						</div>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	{/if}
</div>