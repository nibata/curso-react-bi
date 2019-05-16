import React from 'react'
import useForm from '../../hooks/useForm'
import './style.css'

const HeroForm = ({ submitHero }) => {
  const { handleChange, values, handleSubmit } = useForm(() => submitHero(values))


  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={values['name'] || ''} type="text" name='name' placeholder='Name' />
      <input onChange={handleChange} value={values['race'] || ''} type="text" name='race' placeholder='Race' />
      <input onChange={handleChange} value={values['age'] || ''} type="text" name='age' placeholder='Age' />
      <input onChange={handleChange} value={values['weapon'] || ''} type="text" name='weapon' placeholder='Weapon' />
      <button type='submit'>Save Hero</button>
    </form>
  )
}

export default HeroForm
