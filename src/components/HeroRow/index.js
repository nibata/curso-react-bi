import React from 'react'
import './style.css'
import HeroContext from '../../context/HeroContext'

const HeroRowContainer = ({hero}) => {
  return (
    <HeroContext.Consumer>
      {context => (
        <HeroRow
          hero={hero}
          killHero={() => context.killHero(hero.id)}
          putRing={() => context.putRing(hero.id)}
          heroUsingRing={context.heroUsingRing}
        />
      )}
    </HeroContext.Consumer>
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

  const isDead = status === 'dead' ? 'dead' : ''

  if (usingRing) {
    return null
  }

  return (
    <tr className={`character-row ${isDead}`}>
      <td>{name}</td>
      <td>{race}</td>
      <td>{age}</td>
      <td>{weapon}</td>
      <td>
        <div>
          <div className='controls' onClick={killHero}>☠ Kill</div>
          {!heroUsingRing && <div className='controls' onClick={putRing}>💍 Use Ring</div>}
        </div>
      </td>
    </tr>
  )
}

export default HeroRowContainer
