import React, { useState, useContext } from 'react'
import './style.css'
import HeroContext from '../../context/HeroContext'
import Button from '../../components/Button'

const HeroRowContainer = ({hero}) => {
  const context = useContext(HeroContext)

  return (
    <HeroRow
      hero={hero}
      killHero={() => context.killHero(hero.id)}
      putRing={() => context.putRing(hero.id)}
      heroUsingRing={context.heroUsingRing}
    />
  )
} 

const HeroRow = ({ hero, killHero, putRing, heroUsingRing }) => {
  const {
    name,
    race,
    age,
    weapon,
    status,
    usingRing
  } = hero

  const [show, toggle] = useState(true)

  const isDead = status === 'dead' ? 'dead' : ''

  if (usingRing) {
    return null
  }

  return (
    <tr className={`character-row ${isDead}`}>
      <td>{name}</td>
      <td>{race}</td>
      <td>{age}</td>
      <td>{show ? weapon : 'No weapon'}</td>
      <td>
        <div>
          <div className='controls' onClick={killHero}>☠ Kill</div>
          {!heroUsingRing && <div className='controls' onClick={putRing}>💍 Use Ring</div>}
          <button onClick={() => toggle(!show)}>{show ? 'Hide' : 'Show'} weapon</button>
        </div>
      </td>
    </tr>
  )
}

export default HeroRowContainer
