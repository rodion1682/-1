import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './components/users';
import NavBar from './components/navBar';
import Login from './components/login';
import Main from './components/main';
import UserPages from './components/userPages';

function App() {
   return (
      <div>
         <NavBar />
         <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId" component={UserPages} />
            <Route path="/users" component={Users} />
         </Switch>
      </div>
   );
}

export default App;
