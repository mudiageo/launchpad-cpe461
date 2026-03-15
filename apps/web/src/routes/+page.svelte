<script lang="ts">
	const features = [
		{
			icon: '💡',
			title: 'Submit Ideas',
			description:
				'Share your startup concepts with a structured title, description, and category so others can discover and engage with them.'
		},
		{
			icon: '👍',
			title: 'Vote & Validate',
			description:
				'Upvote ideas you believe in. One vote per person keeps the signal honest and surfaces the best concepts to the top.'
		},
		{
			icon: '💬',
			title: 'Discuss & Refine',
			description:
				'Leave comments, ask questions, and give feedback directly on any idea to help founders sharpen their thinking.'
		},
		{
			icon: '🔥',
			title: 'Discover Trending',
			description:
				'A time-decayed trending score ensures fresh, popular ideas stay visible — not just the oldest submissions.'
		},
		{
			icon: '🗂️',
			title: 'Browse by Category',
			description:
				'Filter across FinTech, EdTech, AgriTech, Health, and more to find ideas in the industries you care about.'
		},
		{
			icon: '🔍',
			title: 'Powerful Search',
			description:
				'Instantly search across thousands of ideas by keyword and find exactly what you\'re looking for in seconds.'
		}
	];

	const steps = [
		{ step: '01', title: 'Create an account', description: 'Sign up for free in under a minute.' },
		{
			step: '02',
			title: 'Submit your idea',
			description: 'Fill in a title, category, and description to share your concept.'
		},
		{
			step: '03',
			title: 'Get feedback',
			description: 'The community votes, comments, and helps you validate your idea.'
		}
	];

	const stats = [
		{ value: '1 200+', label: 'Ideas submitted' },
		{ value: '450+', label: 'Active members' },
		{ value: '8 400+', label: 'Votes cast' },
		{ value: '12', label: 'Categories' }
	];

	const categories = [
		{ icon: '💰', label: 'FinTech' },
		{ icon: '🎓', label: 'EdTech' },
		{ icon: '🌱', label: 'AgriTech' },
		{ icon: '💊', label: 'HealthTech' },
		{ icon: '🛠️', label: 'Developer Tools' },
		{ icon: '🛒', label: 'E-commerce' },
		{ icon: '⚡', label: 'Productivity' },
		{ icon: '🏠', label: 'Smart Home' }
	];
</script>

<!-- ── Landing page shell (no sidebar) ────────────────────────────────── -->
<div class="min-h-screen bg-white font-sans text-gray-800">

	<!-- ── Navbar ────────────────────────────────────────────────────────── -->
	<header class="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-2 text-xl font-extrabold text-violet-600">
				🚀 Launchpad
			</a>
			<nav class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
				<a href="/categories" class="hover:text-violet-600">Categories</a>
				<a href="/trending" class="hover:text-violet-600">Trending</a>
				<a href="/ideas" class="hover:text-violet-600">All Ideas</a>
			</nav>
			<div class="flex items-center gap-3">
				<a
					href="/login"
					class="text-sm font-semibold text-gray-700 hover:text-violet-600"
				>Log in</a>
				<a
					href="/signup"
					class="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
				>Get started</a>
			</div>
		</div>
	</header>

	<!-- ── Hero ──────────────────────────────────────────────────────────── -->
	<section class="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-24 md:py-36">
		<!-- decorative blobs -->
		<div class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl"></div>
		<div class="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"></div>

		<div class="relative mx-auto max-w-4xl px-6 text-center">
			<span class="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-violet-700">
				CPE461 · Spring 2026
			</span>
			<h1 class="text-5xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-6xl">
				Where startup ideas<br />
				<span class="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
					get discovered
				</span>
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg text-gray-500 md:text-xl">
				Launchpad is the community platform for sharing, validating, and refining startup concepts.
				Submit your idea, gather votes, and turn feedback into momentum.
			</p>
			<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/signup"
					class="rounded-xl bg-violet-600 px-8 py-3.5 text-base font-bold text-white shadow-md hover:bg-violet-700"
				>
					Start sharing ideas →
				</a>
				<a
					href="/ideas"
					class="rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
				>
					Browse ideas
				</a>
			</div>
		</div>
	</section>

	<!-- ── Stats bar ─────────────────────────────────────────────────────── -->
	<section class="border-y border-gray-100 bg-white py-8">
		<div class="mx-auto grid max-w-4xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
			{#each stats as s}
				<div class="text-center">
					<p class="text-3xl font-extrabold text-violet-600">{s.value}</p>
					<p class="mt-1 text-sm text-gray-500">{s.label}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- ── Features ──────────────────────────────────────────────────────── -->
	<section class="py-20 md:py-28">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-14 text-center">
				<h2 class="text-4xl font-extrabold text-gray-900">Everything you need to validate faster</h2>
				<p class="mt-3 text-gray-500">All the tools a founder needs — in one focused community.</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each features as f}
					<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
						<div class="mb-4 text-3xl">{f.icon}</div>
						<h3 class="mb-2 text-lg font-bold text-gray-900">{f.title}</h3>
						<p class="text-sm leading-relaxed text-gray-500">{f.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── How it works ──────────────────────────────────────────────────── -->
	<section class="bg-gradient-to-br from-violet-50 to-indigo-50 py-20 md:py-28">
		<div class="mx-auto max-w-4xl px-6">
			<div class="mb-14 text-center">
				<h2 class="text-4xl font-extrabold text-gray-900">How it works</h2>
				<p class="mt-3 text-gray-500">Three steps from idea to community validation.</p>
			</div>
			<div class="grid gap-8 md:grid-cols-3">
				{#each steps as s, i}
					<div class="relative text-center">
						<!-- connector line -->
						{#if i < steps.length - 1}
							<div class="absolute top-6 left-1/2 hidden h-0.5 w-full bg-violet-200 md:block"></div>
						{/if}
						<div class="relative z-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white shadow">
							{s.step}
						</div>
						<h3 class="mb-2 font-bold text-gray-900">{s.title}</h3>
						<p class="text-sm text-gray-500">{s.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── Categories ────────────────────────────────────────────────────── -->
	<section class="py-20 md:py-28">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-12 text-center">
				<h2 class="text-4xl font-extrabold text-gray-900">Browse by industry</h2>
				<p class="mt-3 text-gray-500">Find ideas in the sectors that matter to you.</p>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{#each categories as c}
					<a
						href="/categories"
						class="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:shadow-md"
					>
						<span class="text-2xl">{c.icon}</span>
						<span class="text-sm font-semibold text-gray-700">{c.label}</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── CTA banner ────────────────────────────────────────────────────── -->
	<section class="bg-violet-600 py-20">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<h2 class="text-4xl font-extrabold text-white">Ready to launch your idea?</h2>
			<p class="mt-4 text-violet-200">
				Join hundreds of makers already sharing and validating on Launchpad.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/signup"
					class="rounded-xl bg-white px-8 py-3.5 text-base font-bold text-violet-700 shadow hover:bg-violet-50"
				>
					Create free account
				</a>
				<a
					href="/ideas"
					class="rounded-xl border border-violet-400 px-8 py-3.5 text-base font-semibold text-white hover:bg-violet-500"
				>
					Explore ideas
				</a>
			</div>
		</div>
	</section>

	<!-- ── Footer ────────────────────────────────────────────────────────── -->
	<footer class="border-t border-gray-100 bg-white py-10">
		<div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
			<span class="text-lg font-extrabold text-violet-600">🚀 Launchpad</span>
			<p class="text-sm text-gray-400">
				CPE461 · Computer Engineering Project · {new Date().getFullYear()}
			</p>
			<div class="flex items-center gap-6 text-sm text-gray-500">
				<a href="/ideas" class="hover:text-violet-600">Ideas</a>
				<a href="/categories" class="hover:text-violet-600">Categories</a>
				<a href="/trending" class="hover:text-violet-600">Trending</a>
				<a href="/signup" class="hover:text-violet-600">Sign Up</a>
			</div>
		</div>
	</footer>
</div>
