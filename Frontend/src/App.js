import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Main from './Main';
// import Desc from './Desc';

import Routes from './Routes';
import Login from './Login';
// ['menu', 'playing', 'finished']
function App() {


  return (
    <div className="App">
      {/* <Main/> */}
      {/* <Login/> */}
      <Routes />
    </div>
  );
}

export default App;
