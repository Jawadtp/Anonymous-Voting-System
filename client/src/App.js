import './App.css';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import Home from './components/Home';

function App() 
{
  let history = useHistory();

  return (
    <Router>
      <Switch>
            <Route path="/" render={(props)=> <Home {...props}/>}>
            </Route>
      </Switch>
    </Router>)

}

export default App;


