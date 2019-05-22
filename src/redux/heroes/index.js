const ADD_FILTER = 'ADD_FILTER'

export const addFilter = (filterText) => {
  console.log('SE DISPARA LA ACCIOn')

  return ({
    type: ADD_FILTER,
    payload: {
      filterText
    }
  })
}

const initialState = {
  entities: {
    '1': { id: '1', name: 'Gandalf', race: 'Maia', age: '2019', weapon: 'Staff 🏑' },
    '2': { id: '2', name: 'Aragorn', race: 'Human', age: '120', weapon: 'Sword ⚔' },
    '3': { id: '3', name: 'Legolas', race: 'Elf', age: '200', weapon: 'Bow 🏹' },
    '4': { id: '4', name: 'Gimli', race: 'Dwarf', age: '139', weapon: 'Axe ⚒' },
    '5': { id: '5', name: 'Frodo', race: 'Hobbit', age: '33', weapon: 'Dagger 🗡' },
    '6': { id: '6', name: 'Bilbo', race: 'Hobbit', age: '200', weapon: 'Dagger 🗡' }
  },
  entitiesList: ['1', '2', '3', '4', '5', '6'],
  filterText: ''
}

export default (state = initialState, action) => {
  console.log('LLEGO AL REDUCER LA ACTIOn', action)
  switch (action.type) {
    case ADD_FILTER: {
      console.log('llego el action addfilter y modificara el state con', {
        ...state,
        filterText: action.payload.filterText
      })

      return {
        ...state,
        filterText: action.payload.filterText
      }
    }
  }

  return state
}