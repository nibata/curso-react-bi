import React, { Component } from 'react'
import HeroFilter from '../../components/HeroFilter'
import HeroTable from '../../components/HeroTable'

const heroes = [
  { name: 'Gandalf', race: 'Maia', age: '2019', weapon: 'Staff 🏑' },
  { name: 'Aragorn', race: 'Human', age: '120', weapon: 'Sword ⚔' },
  { name: 'Legolas', race: 'Elf', age: '200', weapon: 'Bow 🏹' },
  { name: 'Gimli', race: 'Dwarf', age: '139', weapon: 'Axe ⚒' },
  { name: 'Frodo', race: 'Hobbit', age: '33', weapon: 'Dagger 🗡' }
]

export default class HeroContainer extends Component {
  render() {
    return (
      <div className="App">
        <div className="index">
          <h2>Fellowship of the Ring</h2>

          <div className="container">
            <HeroFilter placeholder='Search the hero' />

            <HeroTable heroes={heroes} />
          </div>
        </div>
      </div>
    )
  }
}
