import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/user.js';
import ProjectList from './components/project.js';
import TODOList from './components/todo.js';
import ProjectUserList from './components/project_users.js';
import axios from 'axios';
import NotFound404 from './components/not_found404.js'
import {BrowserRouter, Route, Link, Routes, Navigate} from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todo':[]
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users').then(response => {
            const users = response.data
                this.setState(
                {'users': users},
                 )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects').then(response => {
            const projects = response.data
                this.setState(
                {'projects': projects},
                 )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo').then(response => {
            const todo = response.data
                this.setState(
                {'todo': todo},
                 )
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'> Users </Link>
                            </li>
                            <li>
                                <Link to='/projects'> Projects </Link>
                            </li>
                            <li>
                                <Link to='/todo'> Notes </Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList items={this.state.users} />} />
                        <Route exact path='/todo' element={<TODOList items={this.state.todo} />} />
                        <Route path='/projects'>
                            <Route index element={<ProjectList items={this.state.projects} />} />
                            <Route path=":id"> element={<ProjectUserList items={this.state.projects} />} />
                        </Route>
                        <Route exact path='/users' element={<Navigate to='/' />} />
                        <Route path='*' element={<NotFound404/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
