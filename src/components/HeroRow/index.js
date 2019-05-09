import React from 'react'

const HeroRow = ({ hero }) => {
  const {
    name,
    race,
    age,
    weapon
  } = hero

  return (
    <tr className="character-row">
      <td>{name}</td>
      <td>{race}</td>
      <td>{age}</td>
      <td>{weapon}</td>
      <td>
        <div className="controls">
          <div>☠ Kill</div>
          <div>💍 Use Ring</div>
        </div>
      </td>
    </tr>
  )
}

export default HeroRow
