import './App.css';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Detail from './components/Detail'
import CreateActivity from './components/CreateActivity'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component= {LandingPage}/>
        <Route exact path='/home' component= {Home}/>
        <Route path='/detail/:id' component= {Detail}/>
        <Route path='/createActivity' component= {CreateActivity}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
