import React from 'react';
import { Route, Switch} from "react-router-dom";
import Login from './page/Login';
import NicName from './page/NicName';
import RDBox from './page/RDBox';
import Result from './page/Result';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route exact path={"/nicname/:id"} component={NicName} />
        <Route exact path={"/randombox/:id"} component={RDBox} />
        <Route exact path={"/result/:id"} component={Result} />
      </Switch>
    </div>
  );
}

export default App;
