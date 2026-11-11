import { useState } from 'react'
import { searchTracks } from '../api.js' // ../ siirtyy sivut-kansiosta src-kansioon

export default function SearchPage({ playlists, onAdd }) {
  const [query, setQuery] = useState('') // Hakukentän teksti
  const [tracks, setTracks] = useState([]) // Hausta saadut kappaleet
  const [status, setStatus] = useState('idle') // Haun tila
  const [selectedID, setSelectedID] = useState('')    // Valitun soittolistan tunniste

  // Etsi listan tiedot tunnisteen perusteella
  const selectedPlaylist = playlists.find((list) => list.id === selectedID)

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


      <div className="mt-3">
        <label htmlFor="playlist-select" className="form-label">Lisää soittolistaan</label>
        <select
          id="target-playlist"
          className="form-select"
          value={selectedID}
          onChange={(event) => setSelectedID(event.target.value)}
          disabled={playlists.length === 0}
        >
          <option value="">
            {playlists.length === 0 ? 'Luo ensin soittolista' : 'Valitse soittolista'}
          </option>

          {/* Käyttäjä näkee listan nimen. Valinnan arvona on listan tunniste. */}
          {playlists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
      </div>


      {status === 'loading' && <p role="status">Haetaan kappaleita…</p>}
      {status === 'error' && <p role="alert">Haku epäonnistui. Yritä uudelleen.</p>}

      {status === 'success' && (
        tracks.length === 0 ? (
          <p>Kappaleita ei löytynyt.</p>
        ) : (
          <ul className="mt-3">
            {tracks.map((track) => {
              // Tarkista, löytyykö kappale jo valitulta listalta.
              const alreadyAdded = selectedPlaylist?.tracks.some(
                (item) => item.id === track.id,
              )

              return (
                <li key={track.id} className="mb-2">
                  {track.title} – {track.artist}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary ms-2"
                    disabled={!selectedPlaylist || alreadyAdded}
                    onClick={() => onAdd(selectedId, track)}
                  >
                    {alreadyAdded ? 'Listalla' : 'Lisää'}
                  </button>
                </li>
              )
            })}
          </ul>
        )
      )}
    </>
  )
}