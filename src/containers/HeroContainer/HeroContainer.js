import React, { Component } from 'react'
import HeroFilter from '../../components/HeroFilter'
import HeroTable from '../../components/HeroTable'
import Button from '../../components/Button'
import HeroForm from '../../components/HeroForm'
import HeroContext from '../../context/HeroContext'
import './style.css'

export default class HeroContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
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
      usingRingIndex: null,
      killHero: this.killHero.bind(this),
      putRing: this.putRing.bind(this),
      showForm: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.recoverRing = this.recoverRing.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.saveHero = this.saveHero.bind(this)
  }

  componentDidMount () {
    document.title = 'Comunidad del anillo'
  }

  componentDidUpdate () {
    if (this.state.usingRingIndex) {
      document.title = 'Alguien está usando el anillo.'
    } else {
      document.title = 'Comunidad del anillo'
    }
  }

  handleInputChange (event) {
    this.setState({
      filterText: event.target.value
    })
  }

  toggleForm (event) {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  saveHero (hero) {
    console.log(hero)
  }

  editEntity (entities, index, params) {
    return {
      ...entities,
      [index]: {
        ...entities[index],
        ...params
      }
    }
  }

  killHero (heroIndex) {
    const { heroesEntities, heroesList } = this.state

    const withoutKilled = heroesList.filter(heroId => heroId !== heroIndex)

    this.setState({
      heroesEntities: this.editEntity(heroesEntities, heroIndex, { status: 'dead' }),
      heroesList: [...withoutKilled, heroIndex]
    })
  }

  putRing (heroIndex) {
    const { heroesEntities } = this.state

    this.setState({
      heroesEntities: this.editEntity(heroesEntities, heroIndex, { usingRing: true }),
      usingRingIndex: heroIndex
    })
  }

  recoverRing () {
    const { usingRingIndex, heroesEntities } = this.state

    this.setState({
      heroesEntities: this.editEntity(heroesEntities, usingRingIndex, { usingRing: false }),
      usingRingIndex: null
    })
  }
  
  render() {
    const {
      filterText,
      heroesList,
      heroesEntities,
      usingRingIndex,
      showForm
    } = this.state

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
      <HeroContext.Provider value={this.state}>
        <div className="index">
          <h2>Fellowship of the Ring</h2>

          <Button
            text='Recover Ring'
            clickHandler={this.recoverRing}
            visible={usingRingIndex}
          />

          <div className="container">
            <HeroFilter
              placeholder='Search the hero'
              handleInputChange={this.handleInputChange}
              value={filterText}
            />

            {filteredArray.length === 0 && <div>No heroes...</div>}

            {filteredArray.length > 0 && (
              <HeroTable
                heroes={filteredArray}
              />
            )}
          </div>

          <button onClick={this.toggleForm}>{!showForm ? 'Create Hero' : 'Cancel'}</button>

          {showForm && <HeroForm submitHero={this.saveHero} />}
        </div>
      </HeroContext.Provider>
    )
  }
}
