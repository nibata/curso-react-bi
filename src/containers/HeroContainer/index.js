import React, { Component } from 'react'
import HeroFilter from '../../components/HeroFilter'
import HeroTable from '../../components/HeroTable'

const heroes = [
  { name: 'Gandalf', race: 'Maia', age: '2019', weapon: 'Staff 🏑' },
  { name: 'Aragorn', race: 'Human', age: '120', weapon: 'Sword ⚔' },
  { name: 'Legolas', race: 'Elf', age: '200', weapon: 'Bow 🏹' },
  { name: 'Gimli', race: 'Dwarf', age: '139', weapon: 'Axe ⚒' },
  { name: 'Frodo', race: 'Hobbit', age: '33', weapon: 'Dagger 🗡' },
  { name: 'Bilbo', race: 'Hobbit', age: '200', weapon: 'Dagger 🗡' },
]

export default class HeroContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterText: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      filterText: event.target.value
    })
  }
  
  render() {
    const { filterText } = this.state

    let filteredArray = heroes

    if (filterText) {
      filteredArray = filteredArray.filter(hero => {
        return (
          hero.name.toLowerCase().includes(filterText.toLowerCase()) ||
          hero.race.toLowerCase().includes(filterText.toLowerCase())
        )
      })
    }

    return (
      <div className="App">
        <div className="index">
          <h2>Fellowship of the Ring</h2>

          <div className="container">
            <HeroFilter
              placeholder='Search the hero'
              handleInputChange={this.handleInputChange}
              value={filterText}
            />

            {filteredArray.length === 0 && <div>No heroes...</div>}

            {filteredArray.length > 0 && <HeroTable heroes={filteredArray} />}
          </div>
        </div>
      </div>
    )
  }
}
