import React, { useState, useEffect } from 'react'
import HeroFilter from '../../components/HeroFilter'
import HeroTable from '../../components/HeroTable'
import Button from '../../components/Button'
import HeroForm from '../../components/HeroForm'
import HeroContext from '../../context/HeroContext'
import { connect } from 'react-redux'
import { addFilter as addFilterCreator } from '../../redux/heroes'
import './style.css'

const HeroContainer = props => {
  const [state, setState] = useState({
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
    const { addFilter } = props

    addFilter(event.target.value)
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
    heroesList,
    heroesEntities,
    heroUsingRing,
    showForm
  } = state

  const {
    heroes,
    filterText
  } = props

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

          {heroes.length === 0 && <div>No heroes...</div>}

          {heroes.length > 0 && (
            <HeroTable
              heroes={heroes}
            />
          )}
        </div>

        <button onClick={toggleForm}>{!showForm ? 'Create Hero' : 'Cancel'}</button>

        {showForm && <HeroForm submitHero={saveHero} />}
      </div>
    </HeroContext.Provider>
  )
}

const mapStateToProps = state => {
  const {
    entities,
    entitiesList,
    filterText
  } = state.heroes

  let filteredArray = entitiesList.map(id => entities[id])

  if (filterText) {
    filteredArray = filteredArray.filter(hero => {
      return (
        hero.name.toLowerCase().includes(filterText.toLowerCase()) ||
        hero.race.toLowerCase().includes(filterText.toLowerCase())
      )
    })
  }

  return {
    heroes: filteredArray,
    filterText
  }
}

const mapDispatchToProps = {
  addFilter: addFilterCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroContainer)
