export async function load({ fetch }) {
	const res = await fetch(
		'https://fdnd.directus.app/items/person?filter[id][_eq]=266'
	)

	const data = await res.json()

	return {
		person: data.data[0]
	}
}