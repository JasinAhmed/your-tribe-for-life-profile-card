export async function load({ fetch }) {
	const personId = 266

	const response = await fetch(
		`https://fdnd.directus.app/items/person/${personId}`
	)

	const { data: person } = await response.json()

	return {
		person
	}
}