import { Link, Route, Routes } from 'react-router'
import SearchPage from './sivut/SearchPage.jsx'
import PlaylistsPage from './sivut/PlaylistsPage.jsx'
import PlaylistPage from './sivut/PlaylistPage.jsx'

export default function App() {
  return (
    <main className="container py-4">
      <nav className="d-flex gap-3 mb-4">
        <Link to="/">Kappalehaku</Link>
        <Link to="/soittolistat">Omat soittolistat</Link>
      </nav>

      {/* Routes näyttää sen sivun, jonka reitti vastaa osoitetta. */}
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/soittolistat" element={<PlaylistsPage />} />
        <Route path="/soittolistat/:id" element={<PlaylistPage />} />
      </Routes>
    </main>
  )
}