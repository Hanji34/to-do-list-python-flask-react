import React from "react";
import ToDoPage from "./ToDoPage"
import './ToDoPage.css';
import standingman from "./images/standing-11.svg"
import logo from "./images/logo.png"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <div>
                <nav className="light-green darken-2">
                    <img className="brand-logo" src={logo} alt="logo"></img>
                    <ul className="right gap">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/todo">To-Do</Link>
                        </li>

                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/todo">
                        <ToDoPage />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return (<div className="container center">
        <h1>To Do List</h1>
        <h2>Organize sua vida, lembre-se de suas tarefas!</h2>
        <img src={standingman} alt="Man walking"></img>
    </div>)
}


