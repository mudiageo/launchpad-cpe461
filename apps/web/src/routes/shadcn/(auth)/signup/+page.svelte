<script lang="ts">
	import type { ActionData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { form }: { form: ActionData } = $props();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let agree = $state(false);

	const isValid = $derived(
		name.trim().length > 0 && email.includes('@') && password.length >= 8 && agree
	);

	const passwordTooShort = $derived(password.length > 0 && password.length < 8);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-2xl">Create account</Card.Title>
		<Card.Description>Join Launchpad to share and discover startup ideas</Card.Description>
	</Card.Header>

	<Card.Content>
		<form method="POST" action="?/signUpEmail" class="space-y-4">
			{#if form?.message}
				<div class="bg-destructive/10 text-destructive rounded-md px-3 py-2 text-sm">
					{form.message}
				</div>
			{/if}

			<div class="space-y-2">
				<Label for="name">Full Name</Label>
				<Input
					id="name"
					type="text"
					bind:value={name}
					placeholder="John Doe"
					autocomplete="name"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="email">Email address</Label>
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
				<Label for="password">Password</Label>
				<Input
					id="password"
					type="password"
					bind:value={password}
					placeholder="••••••••"
					autocomplete="new-password"
					minlength={8}
					required
				/>
				<p class="text-xs {passwordTooShort ? 'text-destructive' : 'text-muted-foreground'}">
					Must be at least 8 characters
				</p>
			</div>

			<div class="flex items-start gap-3">
				<input
					id="agree"
					type="checkbox"
					bind:checked={agree}
					class="mt-0.5 size-4 accent-violet-600"
				/>
				<label for="agree" class="text-muted-foreground text-sm">
					I agree to the
					<a href="#" class="text-violet-600 hover:underline">Terms of Service</a>
					and
					<a href="#" class="text-violet-600 hover:underline">Privacy Policy</a>
				</label>
			</div>

			<Button
				type="submit"
				class="w-full bg-violet-600 hover:bg-violet-700"
				disabled={!isValid}
			>
				Create account
			</Button>
		</form>
	</Card.Content>

	<Card.Footer class="text-muted-foreground justify-center text-sm">
		Already have an account?
		<Button variant="link" href="/shadcn/login" class="px-1 text-violet-600">Sign in</Button>
	</Card.Footer>
</Card.Root>
