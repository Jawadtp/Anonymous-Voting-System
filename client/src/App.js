import './App.css';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'

import Home from './views/Home';
import Poll from './views/Poll';

function App() 
{
  let history = useHistory();

  return (
    <Router>
      <Switch>
            <Route exact path="/" render={(props)=> <Home {...props}/>}>
            </Route>

            <Route path="/poll/:id" render={(props)=> <Poll {...props}/>}>
            </Route>
            
            
      </Switch>
    </Router>)

}

export default App;


