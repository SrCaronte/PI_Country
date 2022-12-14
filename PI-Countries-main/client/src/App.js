import './App.css';
import {BrowserRouter,Route,Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import AddActivity from './components/AddActivity'
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/activity' component={AddActivity}/>
      <Route path='/detail/:id' component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
