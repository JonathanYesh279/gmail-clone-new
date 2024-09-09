import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom"

import { EmailIndex } from "./pages/EmailIndex"
import { EmailDetails } from "./pages/EmailDetails"

import { UserMsg } from "./cmps/UserMsg"

export function App() {
    return (
      <Router>
        <main>
          <Routes>
            <Route path='/' element={<Navigate to='/mail/inbox' replace />} />
            <Route path='/mail' element={<Navigate to='/mail/inbox' replace />} />
            <Route path= 'mail/:folder' element={<EmailIndex />}>
              <Route path=':id' element={<EmailDetails />} />
            </Route>
          </Routes> 
        </main>
        <UserMsg />
      </Router>
    );
}