import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Register from './Register'
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {auth} from './config'
import {useEffect} from 'react'
import { useStateValue } from './Context';

function App() {
  const [{loggedinuser}, dispatch] = useStateValue();
  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged((userauth) => {
      if(userauth){
        dispatch({
          type: 'SET_LOGIN',
          user: userauth
        })
      }else{
        dispatch({
          type: 'SET_LOGIN',
          user: null
        })
      }
    })
    return () => {
      unsubscribe();
    }
  },[])
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
            <Login />
        </Route>
        <Route exact path="/register">
            <Register />
        </Route>
        <Route exact path="/">
            <Header />
            <Home />
        </Route>
    </Switch>
    </Router>
  );
}

export default App;
