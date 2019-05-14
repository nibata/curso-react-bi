import React from 'react'
import HeroContainer from '../HeroRow'

const HeroTable = ({ heroes }) => (
  <table className="characters-table">
    <tbody>
      <tr className="character-row">
        <th>Name</th>
        <th>Race</th>
        <th>Age</th>
        <th>Weapon</th>
        <th></th>
      </tr>
      {heroes.map((hero, index) => (
        <HeroContainer
          key={index} 
          hero={hero}
        />
      ))}
    </tbody>
  </table>
)

export default HeroTable
