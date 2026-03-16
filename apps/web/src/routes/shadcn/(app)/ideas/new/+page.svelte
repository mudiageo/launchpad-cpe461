<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { categories } from '$lib/mock/launchpad';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	let title = $state('');
	let category = $state('');
	let shortDesc = $state('');
	let fullDesc = $state('');
	let submitted = $state(false);

	const isValid = $derived(
		title.trim().length > 0 &&
			category.trim().length > 0 &&
			shortDesc.trim().length > 0 &&
			fullDesc.trim().length > 0
	);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!isValid) return;
		submitted = true;
	}

	function reset() {
		title = '';
		category = '';
		shortDesc = '';
		fullDesc = '';
		submitted = false;
	}
</script>

<div class="mx-auto max-w-2xl space-y-6">
	<Button href="/shadcn/ideas" variant="ghost" size="sm" class="-ml-2">
		<ArrowLeftIcon class="size-4" />
		Back to ideas
	</Button>

	{#if submitted}
		<Card.Root class="border-green-200 bg-green-50">
			<Card.Header>
				<Card.Title class="text-green-800">Idea submitted! 🎉</Card.Title>
				<Card.Description class="text-green-700">
					Your idea has been shared with the community.
				</Card.Description>
			</Card.Header>
			<Card.Footer class="gap-2">
				<Button href="/shadcn/ideas" class="bg-violet-600 hover:bg-violet-700">Browse ideas</Button>
				<Button variant="outline" onclick={reset}>Submit another</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<div>
			<h1 class="text-2xl font-bold tracking-tight">Submit New Idea</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				Share your startup concept with the community.
			</p>
		</div>

		<Card.Root>
			<Card.Content class="pt-6">
				<form onsubmit={handleSubmit} class="space-y-5">
					<div class="space-y-2">
						<Label for="idea-title">
							Idea Title <span class="text-destructive">*</span>
						</Label>
						<Input
							id="idea-title"
							bind:value={title}
							placeholder="e.g., AI-Powered Code Review Assistant"
							required
						/>
					</div>

					<div class="space-y-2">
						<Label for="category-select">
							Category <span class="text-destructive">*</span>
						</Label>
						<Select.Root bind:value={category}>
							<Select.Trigger class="w-full" id="category-select">
								{category || 'Select a category'}
							</Select.Trigger>
							<Select.Portal>
								<Select.Content>
									{#each categories.filter((item) => item !== 'All') as option}
										<Select.Item value={option} label={option} />
									{/each}
									<Select.Item value="Other" label="Other" />
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>

					<div class="space-y-2">
						<Label for="short-desc">
							Short Description <span class="text-destructive">*</span>
						</Label>
						<Textarea
							id="short-desc"
							bind:value={shortDesc}
							rows={3}
							placeholder="Brief 2–3 sentence summary shown in the idea feed..."
							required
						/>
						<p class="text-muted-foreground text-xs">{shortDesc.length} characters</p>
					</div>

					<div class="space-y-2">
						<Label for="full-desc">
							Full Description <span class="text-destructive">*</span>
						</Label>
						<Textarea
							id="full-desc"
							bind:value={fullDesc}
							rows={6}
							placeholder="Explain your idea in detail — the problem, proposed solution, key features..."
							required
						/>
						<p class="text-muted-foreground text-xs">{fullDesc.length} characters</p>
					</div>

					<div class="flex justify-end gap-3 pt-2">
						<Button variant="outline" href="/shadcn/ideas">Cancel</Button>
						<Button
							type="submit"
							disabled={!isValid}
							class="bg-violet-600 hover:bg-violet-700 disabled:opacity-60"
						>
							Submit Idea
						</Button>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
