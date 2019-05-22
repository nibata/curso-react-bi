import React, { useState, useEffect } from 'react'
import HeroFilter from '../../components/HeroFilter'
import HeroTable from '../../components/HeroTable'
import Button from '../../components/Button'
import HeroForm from '../../components/HeroForm'
import HeroContext from '../../context/HeroContext'
import './style.css'

const HeroContainer = props => {
  const [state, setState] = useState({
    filterText: '',
    heroesEntities: {
      '1': { id: '1', name: 'Gandalf', race: 'Maia', age: '2019', weapon: 'Staff 🏑' },
      '2': { id: '2', name: 'Aragorn', race: 'Human', age: '120', weapon: 'Sword ⚔' },
      '3': { id: '3', name: 'Legolas', race: 'Elf', age: '200', weapon: 'Bow 🏹' },
      '4': { id: '4', name: 'Gimli', race: 'Dwarf', age: '139', weapon: 'Axe ⚒' },
      '5': { id: '5', name: 'Frodo', race: 'Hobbit', age: '33', weapon: 'Dagger 🗡' },
      '6': { id: '6', name: 'Bilbo', race: 'Hobbit', age: '200', weapon: 'Dagger 🗡' }
    },
    heroesList: ['1', '2', '3', '4', '5', '6'],
    heroUsingRing: null,
    killHero,
    putRing,
    showForm: false
  })

  useEffect(() => {
    document.title = 'Comunidad del anillo'

    if (state.heroUsingRing) {
      document.title = 'Alguien está usando el anillo.'
    } else {
      document.title = 'Comunidad del anillo'
    }
  })
  
  const handleInputChange = (event) => {
    setState({
      ...state,
      filterText: event.target.value
    })
  }

  const toggleForm = () => {
    setState({
      ...state,
      showForm: !state.showForm
    })
  }

  const editEntity = (entities, index, params) => {
    return {
      ...entities,
      [index]: {
        ...entities[index],
        ...params
      }
    }
  }

  function killHero (heroIndex) {
    const { heroesEntities, heroesList } = state

    const withoutKilled = heroesList.filter(heroId => heroId !== heroIndex)

    setState({
      ...state,
      heroesEntities: editEntity(heroesEntities, heroIndex, { status: 'dead' }),
      heroesList: [...withoutKilled, heroIndex]
    })
  }

  function putRing (heroIndex) {
    const { heroesEntities } = state

    setState({
      ...state,
      heroesEntities: editEntity(heroesEntities, heroIndex, { usingRing: true }),
      heroUsingRing: heroIndex
    })
  }

  const recoverRing = () => {
    const { heroUsingRing, heroesEntities } = state

    setState({
      ...state,
      heroesEntities: editEntity(heroesEntities, heroUsingRing, { usingRing: false }),
      heroUsingRing: null
    })
  }

  const saveHero = (hero) => {
    const { heroesList, heroesEntities } = state

    const newIndex = heroesList.length + 1

    setState({
      ...state,
      heroesEntities: {
        ...heroesEntities,
        [newIndex]: hero
      },
      heroesList: [...heroesList, newIndex]
    })
  }

  const {
    filterText,
    heroesList,
    heroesEntities,
    heroUsingRing,
    showForm
  } = state

  let filteredArray = heroesList.map(heroId => heroesEntities[heroId])

  if (filterText) {
    filteredArray = filteredArray.filter(hero => {
      return (
        hero.name.toLowerCase().includes(filterText.toLowerCase()) ||
        hero.race.toLowerCase().includes(filterText.toLowerCase())
      )
    })
  }

  return (
    <HeroContext.Provider value={state}>
      <div className="index">
        <h2>Fellowship of the Ring</h2>

        <Button
          text='Recover Ring'
          clickHandler={recoverRing}
          visible={heroUsingRing}
        />

        <div className="container">
          <HeroFilter
            placeholder='Search the hero'
            handleInputChange={handleInputChange}
            value={filterText}
          />

          {filteredArray.length === 0 && <div>No heroes...</div>}

          {filteredArray.length > 0 && (
            <HeroTable
              heroes={filteredArray}
            />
          )}
        </div>

        <button onClick={toggleForm}>{!showForm ? 'Create Hero' : 'Cancel'}</button>

        {showForm && <HeroForm submitHero={saveHero} />}
      </div>
    </HeroContext.Provider>
  )
}

export default HeroContainer
