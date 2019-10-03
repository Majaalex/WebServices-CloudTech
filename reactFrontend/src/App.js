import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import Modifications from './components/Modifications'
import Lists from './components/Lists'
import NewRegistration from './components/NewRegistration'
import Event from './components/Event'
import Person from './components/Person'
import Persons from './components/Persons'
import Events from './components/Events'
import NewPerson from './components/NewPerson'
import NewEvent from './components/NewEvent'
import New from './components/New'

function App() {
  return (
    <div className="App">
     <Router>
        <div>
          <div style={pad}>
            <Link style={padding} to="/modify">Modifications</Link>
            <Link style={padding} to="/new">Create new</Link>
            <Link style={padding} to="/lists">Lists</Link>
            <Link style={padding} to="/modify/persons">Persons</Link>
            <Link style={padding} to="/modify/events">Events</Link>
          </div>
          <Route exact path="/modify" render={() => <Modifications />} />
          <Route exact path="/modify/persons/:id" render={({ match }) => <Person id={match.params.id} />} />
          <Route exact path="/modify/persons" render={() => <Persons />} />
          <Route exact path="/modify/events/:id" render={({ match }) => <Event id={match.params.id}/>} />
          <Route exact path="/modify/events" render={() => <Events />} />
          <Route exact path="/new" render={() => <New />} />
          <Route exact path="/new/registration" render={() => <NewRegistration />} />
          <Route exact path="/new/event" render={() => <NewEvent />} />
          <Route exact path="/new/person" render={() => <NewPerson />} />
          <Route path="/lists" render={() => <Lists />} />
        </div>
      </Router>
    </div>
  );
}

const padding = { padding: 5 }
const pad = {padding: 15}
export default App;
