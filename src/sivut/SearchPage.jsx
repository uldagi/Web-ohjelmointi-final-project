import { useState } from 'react'
import { searchTracks } from '../api.js' // ../ siirtyy sivut-kansiosta src-kansioon

export default function SearchPage() {
  const [query, setQuery] = useState('') // Hakukentän teksti
  const [tracks, setTracks] = useState([]) // Hausta saadut kappaleet
  const [status, setStatus] = useState('idle') // Haun tila

  async function handleSearch(event) {
    event.preventDefault() // Lomakkeen lähetys ei lataa sivua uudelleen
    const term = query.trim()
    if (!term || status === 'loading') return

    setStatus('loading')

    try {
      const results = await searchTracks(term) // Odota iTunesin hakutuloksia
      setTracks(results)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <h1>Kappalehaku</h1>

      <form onSubmit={handleSearch}>
        <label htmlFor="song-query" className="form-label">Kappaleen nimi</label>
        <input
          id="song-query"
          className="form-control"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Esim. Sandstorm"
        />
        <button
          className="btn btn-primary mt-2"
          type="submit"
          disabled={!query.trim() || status === 'loading'}
        >
          Hae kappaleita
        </button>
      </form>

      {status === 'loading' && <p role="status">Haetaan kappaleita…</p>}
      {status === 'error' && <p role="alert">Haku epäonnistui. Yritä uudelleen.</p>}

      {status === 'success' && (
        tracks.length === 0 ? (
          <p>Kappaleita ei löytynyt.</p>
        ) : (
          <ul className="mt-3">
            {tracks.map((track) => (
              <li key={track.id}>{track.title} – {track.artist}</li>
            ))}
          </ul>
        )
      )}
    </>
  )
}