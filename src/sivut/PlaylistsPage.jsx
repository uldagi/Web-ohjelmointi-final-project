import { Link } from 'react-router'
import PlaylistNameForm from '../components/PlaylistNameForm.jsx'

export default function PlaylistsPage({ playlists, onCreate }) {
  return (
    <>
      <h1>Omat soittolistat</h1>

      {/* Anna kirjoitettu nimi Appin createPlaylist-funktiolle. */}
      <PlaylistNameForm buttonLabel="Luo soittolista" onSave={onCreate} />

      {playlists.length === 0 ? (
        <p className="mt-3">Et ole vielä luonut soittolistoja.</p>
      ) : (
        <ul className="mt-3">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              {/* Linkin lopussa on juuri tämän listan tunniste. */}
              <Link to={`/soittolistat/${playlist.id}`}>{playlist.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}