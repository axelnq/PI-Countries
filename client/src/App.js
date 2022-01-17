import './App.css';
// import Countries from './components/Countries'
import {Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Detail from './components/Detail'
import CreateActivity from './components/CreateActivity'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component= {LandingPage}/>
        <Route exact path='/home' component= {Home}/>
        <Route path='/detail/:id' component= {Detail}/>
        <Route path='/createActivity' component= {CreateActivity}/>
      </Switch>
    </div>
  );
}

export default App;
