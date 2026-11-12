import { Link, useParams } from 'react-router' // useParams lukee listan tunnisteen osoitteesta.
import PlaylistNameForm from '../components/PlaylistNameForm.jsx'

export default function PlaylistPage({ playlists, onRename, onRemove }) {
  const { id } = useParams() // Lukee /soittolistat/:id-reitin tunnisteen.
  const playlist = playlists.find((item) => item.id === id)
  

  if (!playlist) {
    return (
      <>
        <h1>Soittolistaa ei löytynyt</h1>
        <Link to="/soittolistat">Palaa omiin soittolistoihin</Link>
      </>
    )
  }

  return (
    <>
      <h1>{playlist.name}</h1>

      <PlaylistNameForm
        key={id}
        initialName={playlist.name}
        buttonLabel="Tallenna nimi"
        onSave={(name) => onRename(id, name)}
      />

      <h2 className="h5 mt-4">Kappaleet</h2>

      {playlist.tracks.length === 0 ? (
        <p>Soittolista on tyhjä.</p>
      ) : (
        <ul>
          {/* Käy läpi juuri tämän soittolistan kappaleet. */}
          {playlist.tracks.map((track) => (
            <li key={track.id} className="mb-2">
              {track.title} – {track.artist}
              <button
                type="button"
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => onRemove(id, track.id)}
              >
                Poista
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}