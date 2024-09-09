import { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"

import { debounce } from "../service/util.service"

import searchIcon from "../assets/imgs/searchIcon.png"
import filterIcon from "../assets/imgs/filterIcon.png"

export function EmailFilter({ filterBy, onFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false)
  const debounceFilterRef = useRef(null)

useEffect(() => {
  debounceFilterRef.current = debounce((newFilterBy) => {
    onFilterBy(newFilterBy);
  }, 500)

  return () => {
    if (debounceFilterRef.current && debounceFilterRef.current.cancel) {
      debounceFilterRef.current.cancel()
    }
  }
}, [onFilterBy])


  
function handleChange({ target }) {
  const { name, value } = target
  const newFilterBy = { ...filterByToEdit, [name]: value }
  setFilterByToEdit(newFilterBy)
  debounceFilterRef.current(newFilterBy)
}
  
  function toggleFilterModal() {
    setIsModalFilterOpen(!isModalFilterOpen)
}


  return (
    <>
      <section className='email-filter'>
        <img src={searchIcon} />
        <input
          value={filterByToEdit.txt || ''}
          onChange={handleChange}
          id='txt'
          name='txt'
          type='text'
          placeholder='Search mail'
        />
        <div onClick={toggleFilterModal} className='filter-icon'>
          <img src={filterIcon} />
        </div>
      </section>
      {isModalFilterOpen && (
        <div className='modal-filter'>
          <div className='modal-filter-container'>

            <form>

              <div className='modal-row'>
                <label>From</label>
                <input />
              </div>

              <div className='modal-row'>
                <label>To</label>
                <input />
              </div>

              <div className='modal-row'>
                <label>Subject</label>
                <input />
              </div>

              <div className='modal-row'>
                <label>Has the words</label>
                <input />
              </div>

              <div className="action-btns">
                <button type='button' onClick={toggleFilterModal}>
                  Cancel
                </button>
                <button>Search</button>
              </div>
              
            </form>

          </div>
        </div>
      )}
    </>
  );
}

EmailFilter.propTypes = {
  filterBy: PropTypes.shape({
    txt: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  onFilterBy: PropTypes.func.isRequired,
}