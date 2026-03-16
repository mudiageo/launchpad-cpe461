<script lang="ts">
	import type { ActionData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { form }: { form: ActionData } = $props();

	let email = $state('');
	let password = $state('');

	const isValid = $derived(email.includes('@') && password.length >= 8);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-2xl">Welcome back</Card.Title>
		<Card.Description>Sign in to your Launchpad account</Card.Description>
	</Card.Header>

	<Card.Content>
		<form method="POST" action="?/signInEmail" class="space-y-4">
			{#if form?.message}
				<div class="bg-destructive/10 text-destructive rounded-md px-3 py-2 text-sm">
					{form.message}
				</div>
			{/if}

			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					type="email"
					bind:value={email}
					placeholder="you@example.com"
					autocomplete="email"
					required
				/>
			</div>

			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<Label for="password">Password</Label>
					<a href="#" class="text-xs text-violet-600 hover:underline">Forgot password?</a>
				</div>
				<Input
					id="password"
					type="password"
					bind:value={password}
					placeholder="••••••••"
					autocomplete="current-password"
					required
				/>
			</div>

			<Button
				type="submit"
				class="w-full bg-violet-600 hover:bg-violet-700"
				disabled={!isValid}
			>
				Sign in
			</Button>
		</form>
	</Card.Content>

	<Card.Footer class="text-muted-foreground justify-center text-sm">
		Don't have an account?
		<Button variant="link" href="/shadcn/signup" class="px-1 text-violet-600">Sign up</Button>
	</Card.Footer>
</Card.Root>
