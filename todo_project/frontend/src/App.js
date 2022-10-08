import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/user.js';
import ProjectList from './components/project.js';
import TODOList from './components/todo.js';
import LoginForm from './components/Auth.js';
import ProjectUserList from './components/project_users.js';
import axios from 'axios';
import NotFound404 from './components/not_found404.js'
import {BrowserRouter, Route, Link, Routes, Navigate} from 'react-router-dom'
import Cookies from 'universal-cookie'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todo':[],
            'token': ''
        }
    }

    logout(){
        this.set_token('')
    }

    is_auth(){
        return this.set_token != ''
    }

    set_token(token){
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token':token}, () => this.load_data())
    }

    get_token_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token':token}, () => this.load_data())
    }

    get_token(username, password){
        const data = {username:username, password:password};
        axios.post('http://localhost:8000/api-token/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Wrong login or password, bitch'))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
        if (this.is_auth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data(){
    const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers}).then(response => {
            const users = response.data
                this.setState(
                {'users': users},
                 )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects', {headers}).then(response => {
            const projects = response.data
                this.setState(
                {'projects': projects},
                 )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo', {headers}).then(response => {
            const todo = response.data
                this.setState(
                {'todo': todo},
                 )
        }).catch(error => console.log(error))
        console.log(this.state)

    }


    componentDidMount() {
        this.get_token_storage()
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
                            <li>
                               {this.is_auth() ?<button> onClick = {() => this.logout()}> Logout </button> : <Link to='/login'> Login </Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList items={this.state.users} />} />
                        <Route exact path='/todo' element={<TODOList items={this.state.todo} />} />
                        <Route exact path='/login' element={<LoginForm get_token={(username, password) =>
                       this.get_token(username, password)} />} />
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
