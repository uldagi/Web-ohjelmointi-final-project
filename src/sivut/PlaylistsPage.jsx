import { Link } from 'react-router'
import PlaylistNameForm from '../components/PlaylistNameForm.jsx'

export default function PlaylistsPage({ playlists, onCreate }) {
  return (
    <>
      <h1>Omat soittolistat</h1>

      {/* Lomake kutsuu Apin CreatePlaylist -funktiota annetulla nimellä */}
      <PlaylistNameForm buttonLabel="Luo soittolista" onSave={onCreate} />

      <ul className="mt-3">
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <Link to={`/soittolistat/${playlist.id}`}>{playlist.name}</Link>
        </li>
      ))}
      </ul>
    </>
  )
}