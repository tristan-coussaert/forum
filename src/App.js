import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
            <Login />
        </Route>
        <Route exact path="/register">
            <Register />
        </Route>
    </Switch>
    </Router>
  );
}

export default App;
