import { Link } from 'react-router'

export default function PlaylistsPage() {
  return (
    <>
      <h1>Omat soittolistat</h1>
      {/* Väliaikainen linkki, jolla voit testata kolmatta näkymää. */}
      <Link to="/soittolistat/testi">Avaa testisoittolista</Link>
    </>
  )
}