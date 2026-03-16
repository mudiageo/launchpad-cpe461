<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { profile } from '$lib/mock/launchpad';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	let fullName = $state(profile.name);
	let email = $state(profile.email);
	let bio = $state(profile.bio);
	let saved = $state(false);

	const isValid = $derived(fullName.trim().length > 0 && email.includes('@') && bio.trim().length > 0);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!isValid) return;
		saved = true;
	}
</script>

<div class="mx-auto max-w-2xl space-y-6">
	<Button href="/shadcn/profile" variant="ghost" size="sm" class="-ml-2">
		<ArrowLeftIcon class="size-4" />
		Back to profile
	</Button>

	<div>
		<h1 class="text-2xl font-bold tracking-tight">Account Settings</h1>
		<p class="text-muted-foreground mt-1 text-sm">Manage your profile and preferences.</p>
	</div>

	<Card.Root>
		<Card.Content class="pt-6">
			<form onsubmit={handleSubmit} class="space-y-5">
				<div class="space-y-2">
					<Label for="full-name">Full Name</Label>
					<Input id="full-name" bind:value={fullName} required />
				</div>

				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" bind:value={email} required />
				</div>

				<div class="space-y-2">
					<Label for="bio">Bio</Label>
					<Textarea id="bio" rows={4} bind:value={bio} />
				</div>

				<div class="flex items-center justify-between gap-3 pt-2">
					{#if saved}
						<p class="text-sm text-green-700">Account settings saved locally.</p>
					{/if}
					<div class="ml-auto flex gap-3">
						<Button variant="outline" href="/shadcn/profile">Cancel</Button>
						<Button
							type="submit"
							disabled={!isValid}
							class="bg-violet-600 hover:bg-violet-700 disabled:opacity-60"
						>
							Save Changes
						</Button>
					</div>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
