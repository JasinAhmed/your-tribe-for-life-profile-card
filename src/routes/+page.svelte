<script>
	let { data } = $props()

	const person = data.person

	function parseCustom(custom) {
		if (typeof custom === 'string') {
			return JSON.parse(custom)
		}

		return custom || {}
	}

	const custom = parseCustom(person.custom)

	const skills = [
		custom.skill1,
		custom.skill2,
		custom.skill3
	].filter(Boolean)

	const hobbies = [
		custom.hobby1,
		custom.hobby2,
		custom.hobby3
	].filter(Boolean)
</script>

<svelte:head>
	<title>{person.name} | Profile book</title>
</svelte:head>

<main class="profile-page">
	<article class="book">
		<section class="left-page">
			{#if person.mugshot_year2}
				<picture class="image-wrapper">
					<source
						type="image/avif"
						srcset={`https://fdnd.directus.app/assets/${person.mugshot_year2}?width=400&height=400&fit=cover&format=avif&quality=80`}
					/>

					<source
						type="image/webp"
						srcset={`https://fdnd.directus.app/assets/${person.mugshot_year2}?width=400&height=400&fit=cover&format=webp&quality=80`}
					/>

					<img
						class="profile-image"
						src={`https://fdnd.directus.app/assets/${person.mugshot_year2}?width=400&height=400&fit=cover&quality=80`}
						alt={`Profile of ${person.name}`}
					/>
				</picture>
			{/if}

			<section class="personal-information">
				<p class="label">NAME</p>
				<h1>{person.name}</h1>

				<p class="label">TEAM</p>

				<p class="information-value">
					{person.team_s13 || 'No team available'}
				</p>

				<p class="label">SOCIALS</p>

				<nav class="social-links">
					{#if person.github_handle}
						<a
							class="social-link"
							href={`https://github.com/${person.github_handle}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/github.svg"
								alt="GitHub"
							/>
						</a>
					{/if}

					<a
						class="social-link"
						href="https://www.linkedin.com/in/jasin-ahmed-964839247/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="/linkedin.png"
							alt="LinkedIn"
						/>
					</a>
				</nav>
			</section>
		</section>

		<section class="right-page">
			<section class="about">
				<h2>ABOUT ME</h2>

				<p>
					{person.bio || 'This member has not written an about me yet.'}
				</p>
			</section>

			<section class="skills">
				<h2>SKILLS</h2>

				<ul>
					{#each skills as skill}
						<li>{skill}</li>
					{:else}
						<li>No skills available</li>
					{/each}
				</ul>
			</section>

			<section class="hobbies">
				<h2>HOBBIES</h2>

				<ul>
					{#each hobbies as hobby}
						<li>{hobby}</li>
					{:else}
						<li>No hobbies available</li>
					{/each}
				</ul>
			</section>
		</section>
	</article>
</main>
<style>
	.profile-page {
		--page-background: #f5f0e5;
		--paper-color: #fffdf6;
		--text-color: #173c33;
		--body-text-color: #111111;
		--label-color: #5b7a71;
		--accent-color: #ef8c43;
		--book-radius: 1rem;
		--book-shadow: 0 0.5rem 1rem #0000001a;
		--page-padding: 2rem;

		display: flex;
		justify-content: center;

		width: 100%;
		min-height: 100svh;
		padding: 1rem;

		background-color: var(--page-background);

		box-sizing: border-box;
	}

	.book {
		width: 100%;
		max-width: 22rem;

		background-color: var(--paper-color);
		border-radius: var(--book-radius);
		box-shadow: var(--book-shadow);

		overflow: hidden;
	}

	.left-page {
		padding: var(--page-padding);

		.image-wrapper {
			display: block;

			width: 100%;
			max-width: 15rem;
			margin: 0 auto 1.5rem;
		}

		.profile-image {
			display: block;

			width: 100%;
			aspect-ratio: 1 / 1;

			object-fit: cover;

			border: 0.15rem dashed var(--text-color);
			border-radius: var(--book-radius);

			box-sizing: border-box;
		}

		.personal-information {
			.label {
				margin: 0;

				color: var(--label-color);
				font-size: 0.75rem;
				font-weight: bold;
			}

			h1 {
				margin: 0.3rem 0 1rem;

				color: var(--body-text-color);
				font-size: 1.3rem;
			}

			.information-value {
				margin: 0.3rem 0 1rem;

				color: var(--body-text-color);
				font-size: 1rem;
				font-weight: 600;
			}
		}
	}
</style>