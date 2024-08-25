import { useState, useEffect } from "react"

import searchIcon from '../assets/imgs/searchIcon.png'


export function EmailFilter({ filterBy, onFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => { 
    onFilterBy(filterByToEdit)
  }, [filterByToEdit])


  
  function handleChange({ target }) {
    const { name, value } = target
    setFilterByToEdit(prev => ({
      ...prev,
      [name]: value
    }))
  }


  return (
    <section className='email-filter'>
      <input
        value={filterByToEdit.txt || ''}
        onChange={handleChange}
        id='txt'
        name='txt'
        type='text'
        placeholder='Search mail'
      />
    </section>
  );
}