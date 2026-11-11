import { useId, useState } from 'react'

export default function PlaylistNameForm({ initialName = '', buttonLabel, onSave }) {
  const [name, setName] = useState(initialName) // Kentän nykyinen teksti
  const inputId = useId() // Yhdistää kentän ja sen otsikon

  function handleSubmit(event) {
    event.preventDefault() // Estää sivun uudelleenlatauksen
    const trimmedName = name.trim()
    if (!trimmedName) return

    onSave(trimmedName) // Lähettää nimen listan luontiin tai uudelleennimeämiseen
    setName(initialName ? trimmedName : '') // Tyhjentää kentän uuden listan luomisen jälkeen
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="form-label">Soittolistan nimi</label>
      <input
        id={inputId}
        className="form-control"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={80}
        required
      />
      <button type="submit" className="btn btn-primary mt-2">
        {buttonLabel}
      </button>
    </form>
  )
}