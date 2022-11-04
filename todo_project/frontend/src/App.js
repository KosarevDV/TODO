import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuList from './components/menu.js';
import UserList from './components/user.js';
import Footer from './components/footer.js';
import axios from 'axios'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users').then(response => {
            const users = response.data
                this.setState(
                {'users': users},
                 )
        }).catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <MenuList/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;