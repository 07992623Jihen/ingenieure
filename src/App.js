import React from "react";
import NavigationDrawer from "./components/navigationBar";
import AjoutPlante from "./pages/ajoutPlantes";
import { BrowserRouter, Route } from "react-router-dom";
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/auth";
import Login from "./pages/login";
import NavLogin from "./components/NavLogin";
import ListePlante from "./pages/ListPlante";
import UpdatePlante from "./pages/updatePlante";
import ListeHerbicide from "./pages/lsiteHerbicide";
import AjoutHerbicide from "./pages/ajoutHerbicide";
import UpdateHerbicide from "./pages/updateHerbicide";
import Reclamation from "./pages/reclamation";
import Responce from "./pages/responce";

function App() {
  const { userId, token, login, logout } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={ListePlante} />
        <Route path="/ajout-plante"  component={AjoutPlante} />
        <Route path="/update-plante/:id"  component={UpdatePlante} />
        <Route path="/herbicide/:id"  component={ListeHerbicide} />
        <Route path="/ajoutHerbicide/:id"  component={AjoutHerbicide} />
        <Route path="/update-herbicide/:id"  component={UpdateHerbicide} />
        <Route path="/reclamation"  component={Reclamation} />
        <Route path="/responce/:id"  component={Responce} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Login} />
      </React.Fragment>
    );
  }

  return ( 
    <div>
      <Authcontext.Provider
        value={{ userId: userId, token: token, login: login, logout: logout }}
      >
        <BrowserRouter>
          {token ? <NavigationDrawer content={routes} /> : <NavLogin />}

          <div style={{ marginTop: "8%" }}>{!token && routes}</div>
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
