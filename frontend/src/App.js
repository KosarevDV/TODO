import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/user.js';
import ProjectList from './components/project.js';
import TODOList from './components/todo.js';
import LoginForm from './components/Auth.js';
import ProjectUserList from './components/project_users.js';
import ProjectForm from './components/project_form.js';
import TODOForm from './components/todo_form.js';
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
        let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json; version=0.2'
        }
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


    createProject(name, users) {
        const headers = this.get_headers()
        const data = {name: name, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
            .then(response => {
                let new_project = response.data
                const users = this.state.users.filter((item) => item.id in new_project.users)
                new_project.users = users
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }


    createTODO(project, text, users) {
        const headers = this.get_headers()
        const data = {project: project, text: text, users: users}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, { headers})
            .then(response => {this.load_data()}).catch(error => this.setState({todo: []}))
    }


    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
        .then(response => {
        this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
    }


    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers}).then(response => {
        this.load_data()}).catch(error => {this.setState({todo: []})})
    }


    componentDidMount(){
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
                        <Route exact path='/todo' element={<TODOList items={this.state.todo} deleteTodo= {(id)=>this.deleteTodo(id) }   />} />
                        <Route exact path='/todo/create' element={<TODOForm items={this.state.todo} createTODO = {(project, text, users)=>this.createTODO(project, text, users) }   />} />
                        <Route exact path='/login' element={<LoginForm get_token={(username, password) =>
                       this.get_token(username, password)} />} />
                        <Route path='/projects'>
                            <Route index element={<ProjectList items={this.state.projects}  deleteProject={(id)=>this.deleteProject(id)}  />} />
                            <Route path=":id"> element={<ProjectUserList items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />
                            <Route path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, users) => this.createProject(name, users)}  />} />
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
