<script lang="ts">
	let { children }: { children: import('svelte').Snippet } = $props();
</script>

<div class="bg-muted/40 flex min-h-screen items-center justify-center p-4">
	<div class="w-full max-w-md">
		<div class="mb-8 text-center">
			<a href="/" class="inline-flex items-center gap-2 text-xl font-extrabold text-violet-600">
				🚀 Launchpad
			</a>
		</div>
		{@render children()}
	</div>
</div>
