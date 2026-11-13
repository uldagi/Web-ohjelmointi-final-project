
import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router'
import SearchPage from './sivut/SearchPage.jsx'
import PlaylistsPage from './sivut/PlaylistsPage.jsx'
import PlaylistPage from './sivut/PlaylistPage.jsx'

const storageKey = 'soittolistat.v1'

function readPlaylistss() {
  try {
    const saved = localStorage.getItem(storageKey)            // Hakee tallennetut soittolistat selaimen muistista. Jos niitä ei ole, palautetaan tyhjä lista.
    if (saved === null) return []

    const playlists = JSON.parse(saved) // Muunna JSON-teksti takaisin olioiksi
    return Array.isArray(playlists) ? playlists : []        // Soittolistan pitää olla taulukko
  } catch {
    return []
  }
}

export default function App() {
  const [playlists, setPlaylists] = useState(readPlaylistss) //Lue listat käynnistyksen yhteydessä

  useEffect(() => {
    try {
      // Tallenna listat selaimeen aina, kun playlists-tila muuttuu.
      localStorage.setItem(storageKey, JSON.stringify(playlists))
    } catch (error) {
      console.warn('Soittolistojen tallennus epäonnistui.', error)
    }
  }, [playlists])

  function createPlaylist(name) {                      // Annetaaan uudelle listalle id, nimi ja tyhjä kappalelista
    const playlist = { id: crypto.randomUUID(), name, tracks: [] }
    setPlaylists((current) => [...current, playlist])
  }

  function updatePlaylist(playlistId, update) {
    // Käy listat läpi ja päivitä ID:llä valittu lista.
    setPlaylists((current) =>
      current.map((playlist) =>
        playlist.id === playlistId ? update(playlist) : playlist,
      ),
    )
  }

  function renamePlaylist(playlistId, name) {
    updatePlaylist(playlistId, (playlist) => ({ ...playlist, name }))
  }

  function addTrack(playlistId, track) {
    updatePlaylist(playlistId, (playlist) => {
      // ID:n avulla estetään saman kappaleen lisääminen kahdesti.
      const alreadyAdded = playlist.tracks.some((item) => item.id === track.id)
      if (alreadyAdded) return playlist

      return { ...playlist, tracks: [...playlist.tracks, track] }
    })
  }

  function removeTrack(playlistId, trackId) {
    updatePlaylist(playlistId, (playlist) => ({
      ...playlist,
      tracks: playlist.tracks.filter((track) => track.id !== trackId),             
    }))        // Filter kerää uuteen taulukkoon kappaleet, joiden tunniste eroaa poistettavasta kappaleesta. Näin saadaan poistettua haluttu kappale listalta. //
  }

  return (
    <>
      <header className="bg-white border-bottom">
        <div className="container app-width d-flex flex-wrap align-items-center gap-3 py-3">
          <span className="fw-bold fs-5 me-auto">Soittolistat</span>

          <nav className="nav nav-pills gap-1" aria-label="Päävalikko">
            {/* end rajaa linkin korostuksen etusivulle. */}
            <NavLink to="/" end className="nav-link">
              Kappalehaku
            </NavLink>

            <NavLink to="/soittolistat" className="nav-link">
              Omat soittolistat
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container app-width py-4 py-md-5">
        {/* Routes valitsee osoitetta vastaavan sivun. */}
        <Routes>
          <Route
            path="/"
            element={<SearchPage playlists={playlists} onAdd={addTrack} />}
          />
          <Route
            path="/soittolistat"
            element={<PlaylistsPage playlists={playlists} onCreate={createPlaylist} />}
          />
          <Route
            path="/soittolistat/:id"
            element={
              <PlaylistPage
                playlists={playlists}
                onRename={renamePlaylist}
                onRemove={removeTrack}
              />
            }
          />
        </Routes>
      </main>
    </>
  )
}