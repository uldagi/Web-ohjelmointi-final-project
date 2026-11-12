
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router'
import SearchPage from './sivut/SearchPage.jsx'
import PlaylistsPage from './sivut/PlaylistsPage.jsx'
import PlaylistPage from './sivut/PlaylistPage.jsx'

const storageKey = 'soittolistat.v1'

function readPlaylistss() {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === null) return []

    const playlists = JSON.parse(saved) // Muunna JSON-teksti takaisin olioiksi
    return Array.isArray(playlists) ? playlists : []
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

  function createPlaylist(name) {
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
    }))
  }

  return (
    <main className="container py-4">
      <nav className="d-flex gap-3 mb-4">
        <Link to="/">Kappalehaku</Link>
        <Link to="/soittolistat">Omat soittolistat</Link>
      </nav>

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
  )
}