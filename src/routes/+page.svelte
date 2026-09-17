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

	const initials = person.name
		?.split(' ')
		.map((namePart) => namePart[0])
		.slice(0, 2)
		.join('')
		.toUpperCase()

	let isOpen = $state(false)

	function toggleBook() {
		isOpen = !isOpen
	}
</script>

<svelte:head>
	<title>{person.name} | Profile book</title>
</svelte:head>

<main class="profile-page">
	<article class:open={isOpen} class="book">
		<div class="book-pages">
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
								src="/Linkedin.png"
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

				<button
					class="close-book"
					type="button"
					onclick={toggleBook}
				>
					CLOSE BOOK
				</button>
			</section>
		</div>

		<button
			class="front-cover"
			type="button"
			onclick={toggleBook}
		>
			<span class="cover-logo">
				{initials}
			</span>

			<h1>{person.name}</h1>

			<span class="cover-line"></span>

			<span class="cover-instruction">
				CLICK TO OPEN
			</span>
		</button>
	</article>
</main>

<style>
	.profile-page {
		--page-background: #f5f0e5;
		--paper-color: #fffdf6;
		--heading-color: #173c33;
		--body-text-color: #111111;
		--label-color: #5b7a71;
		--accent-color: #ef8c43;
		--skill-background: #c8d9d3;
		--line-color: #333333;
		--social-border-color: #d7d0c0;
		--cover-background: #050505;
		--cover-text-color: #ffffff;
		--cover-detail-color: #d6b765;
		--book-radius: 1rem;
		--book-shadow: 0 0.5rem 1rem #0000001a;
		--page-padding: 2rem;

		display: flex;
		justify-content: center;
		align-items: flex-start;

		width: 100%;
		min-height: 100svh;
		padding: 1rem;

		background-color: var(--page-background);

		box-sizing: border-box;
	}

	.book {
		position: relative;

		width: 100%;
		max-width: 22rem;
		min-height: 34rem;

		background-color: var(--paper-color);
		border-radius: var(--book-radius);
		box-shadow: var(--book-shadow);

		perspective: 100rem;
		overflow: hidden;

		transition:
			max-width 0.8s ease,
			min-height 0.8s ease;

		&.open {
			min-height: 68rem;

			.book-pages {
				position: relative;

				opacity: 1;
				visibility: visible;

				transition:
					opacity 0.4s ease 0.5s,
					visibility 0s;
			}

			.front-cover {
				opacity: 0;

				pointer-events: none;

				transform: rotateY(-180deg);
			}
		}
	}

	.book-pages {
		position: absolute;
		inset: 0;

		width: 100%;

		opacity: 0;
		visibility: hidden;

		transition:
			opacity 0.2s ease,
			visibility 0s linear 0.8s;
	}

	.front-cover {
		position: absolute;
		inset: 0;
		z-index: 2;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
		min-height: 34rem;
		padding: var(--page-padding);

		color: var(--cover-text-color);
		font: inherit;

		background-color: var(--cover-background);
		border: 0.15rem solid var(--cover-detail-color);
		border-left: 0.7rem solid var(--heading-color);
		border-radius: var(--book-radius);

		box-shadow:
			0.5rem 0.5rem 0 var(--heading-color),
			0 0 0 0.3rem var(--cover-background);

		backface-visibility: hidden;
		box-sizing: border-box;
		cursor: pointer;

		transform: rotateY(0);
		transform-origin: left center;
		transform-style: preserve-3d;

		transition:
			transform 1s ease,
			opacity 0.3s ease 0.7s;

		h1 {
			margin: 0;

			font-size: 1.5rem;
			text-align: center;
		}

		.cover-logo {
			display: grid;
			place-items: center;

			width: 6rem;
			height: 6rem;
			margin-bottom: 1.5rem;

			color: var(--cover-detail-color);
			font-size: 1.8rem;
			font-weight: bold;

			background-color: #1d1d1d;
			border-radius: 50%;
		}

		.cover-line {
			width: 8rem;
			height: 0.25rem;
			margin: 1rem 0 2.5rem;

			background-color: var(--accent-color);
			border-radius: 1rem;
		}

		.cover-instruction {
			color: #bcbcbc;
			font-size: 0.8rem;
		}

		&:focus-visible {
			outline: 0.2rem solid var(--accent-color);
			outline-offset: 0.3rem;
		}
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

			border: 0.15rem dashed var(--heading-color);
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

			.social-links {
				display: flex;
				gap: 0.75rem;

				margin-top: 0.5rem;

				.social-link {
					display: grid;
					place-items: center;

					width: 2.5rem;
					height: 2.5rem;

					background-color: white;
					border: 0.1rem solid var(--social-border-color);
					border-radius: 50%;

					transition:
						transform 0.2s ease,
						border-color 0.2s ease;

					img {
						display: block;

						width: 1.4rem;
						height: 1.4rem;

						object-fit: contain;
					}

					&:hover {
						border-color: var(--accent-color);
						transform: translateY(-0.15rem);
					}

					&:focus-visible {
						outline: 0.15rem solid var(--accent-color);
						outline-offset: 0.2rem;
					}
				}
			}
		}
	}

	.right-page {
		padding: var(--page-padding);

		border-top: 0.15rem solid var(--line-color);

		.about,
		.skills,
		.hobbies {
			h2 {
				margin: 0 0 0.8rem;

				color: var(--heading-color);
				font-size: 1.3rem;
			}
		}

		.about {
			padding-bottom: 1.5rem;

			p {
				margin: 0;

				color: var(--body-text-color);
				font-size: 1rem;
				line-height: 1.6;
			}
		}

		.skills,
		.hobbies {
			padding: 1.5rem 0;

			border-top: 0.1rem solid var(--line-color);

			ul {
				display: flex;
				flex-wrap: wrap;
				gap: 0.5rem;

				margin: 0;
				padding: 0;

				list-style: none;
			}
		}

		.skills {
			li {
				padding: 0.35rem 0.8rem;

				color: var(--body-text-color);
				font-size: 0.9rem;
				font-weight: bold;

				background-color: var(--skill-background);
				border-radius: 2rem;

				&:first-child {
					color: white;
					background-color: var(--accent-color);
				}
			}
		}

		.hobbies {
			li {
				color: var(--body-text-color);
				font-size: 1rem;
				font-weight: 600;
			}
		}

		.close-book {
			margin-top: 1.5rem;
			padding: 0.6rem 1rem;

			color: white;
			font: inherit;
			font-size: 0.8rem;
			font-weight: bold;

			background-color: var(--heading-color);
			border: 0;
			border-radius: 2rem;

			cursor: pointer;

			transition: background-color 0.2s ease;

			&:hover {
				background-color: var(--accent-color);
			}

			&:focus-visible {
				outline: 0.15rem solid var(--accent-color);
				outline-offset: 0.2rem;
			}
		}
	}

	/* Tablet and desktop styling */

	@media (min-width: 48rem) {
		.profile-page {
			align-items: center;

			padding: 2rem;
		}

		.book {
			&.open {
				max-width: 52rem;
				min-height: 38rem;
			}
		}

		.book-pages {
			display: grid;
			grid-template-columns: repeat(2, 1fr);

			min-height: 38rem;
		}

		.left-page,
		.right-page {
			padding: 3rem;
		}

		.left-page {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.image-wrapper {
				max-width: 15rem;
				margin: 0 auto 1.5rem;
			}
		}

		.right-page {
			display: flex;
			flex-direction: column;
			justify-content: center;

			border-top: 0;
			border-left: 0.15rem solid var(--line-color);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.book,
		.front-cover,
		.book-pages,
		.social-link,
		.close-book {
			transition-duration: 0.01ms;
		}
	}
</style>