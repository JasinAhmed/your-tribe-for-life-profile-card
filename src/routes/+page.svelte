<script>
	let { data } = $props()

	const person = data.person
</script>

<main>
	<article class="profile-card">
		<h1>{person.name}</h1>

		{#if person.avatar}
			<img
				src={person.avatar}
				alt={person.name}
			/>
		{/if}

		{#if person.bio}
			<p>{person.bio}</p>
		{/if}
	</article>
</main>