import { HashRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from "react"


import { EmailIndex } from "./pages/EmailIndex"

import { AppHeader } from "./cmps/AppHeader"
import { EmailDetails } from "./pages/EmailDetails"

export function App() {
    const [filterBy, setFilterBy] = useState({ txt: '', isRead: '', inbox: null, isStarred: null })
    
     const onFilterBy = (newFilterBy) => {
       setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...newFilterBy }))
     }
    
    return (
      <Router>
        <AppHeader filterBy={filterBy} onFilterBy={onFilterBy} />
        <main>
          <Routes>
                <Route path="/" element={<EmailIndex filterBy={filterBy} setFilterBy={setFilterBy} />} />
                <Route path='/email' element={<EmailIndex filterBy={filterBy} setFilterBy={setFilterBy} />}>
                <Route path='/email:id' element={<EmailDetails />} />
            </Route>
          </Routes>
        </main>
      </Router>
    );
}