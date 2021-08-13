import logo from './logo.svg';
import './App.css';
import Login from './Login'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
        <Route exact path="/login">
            <Login />
          </Route>
    </Router>
  );
}

export default App;
