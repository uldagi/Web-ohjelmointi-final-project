export async function searchTracks(query) {
  // URLSearchParams muuntaa välilyönnit ja erikoismerkit URLiin sopiviksi.
  const params = new URLSearchParams({
    term: query,
    country: 'FI',
    media: 'music',
    entity: 'song',
    attribute: 'songTerm',
    limit: '20',
  })
  const response = await fetch(`https://itunes.apple.com/search?${params}`, {
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) {
    throw new Error(`Kappalehaku epäonnistui (${response.status}).`)
  }

  const data = await response.json()
  // Sovellus käyttää API-vastauksesta vain kappaleen tunnistetta, nimeä ja artistia.
  return data.results.map((track) => ({
    id: track.trackId,
    title: track.trackName,
    artist: track.artistName,
  }))
}