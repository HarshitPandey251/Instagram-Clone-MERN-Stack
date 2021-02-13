import React,{useEffect, createContext,useContext,useReducer} from 'react';
import NavBar from './component/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './component/screens/Home'
import Signin from './component/screens/Login'
import Profile from './component/screens/Profile'
import Signup from './component/screens/Signup'
import CreatePost from './component/screens/CreatePost'
import {initialState, reducer} from './reducers/userReducer'
import UserProfile from './component/screens/UserProfile'
import SubscribeUser from './component/screens/SubcribeUser'
export const UserContext = createContext()


const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
       <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signin">
        <Signin/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/myfollowingpost">
        <SubscribeUser/>
      </Route>
    </Switch>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
