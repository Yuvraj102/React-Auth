import "./App.css";
import {Route , Switch} from 'react-router-dom'
import Login from './components/Login'
import User from './components/User'
import Logout from './components/Logout'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/user" component={User}/>
      <Route exact path="/logout" component={Logout}/>
    </Switch>
  );
}
export default App;
