import { useState, useEffect } from 'react'

const useForm = (callback) => {
  const [values, setValues] = useState({})

  const handleSubmit = event => {
    event.preventDefault()

    callback()
  }

  const handleChange = event => {
    const value = event.target.value
    const name = event.target.name

    setValues({
      ...values,
      [name]: value
    })
  }

  return {
    handleChange,
    handleSubmit,
    values
  }
}

export default useForm
