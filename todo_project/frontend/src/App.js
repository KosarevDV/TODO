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
            'menu_items': [],
            'footer': {}
        }
    }

    componentDidMount() {

        const menu_items = ['Users', 'Projects', 'Notes']
        const footer = {'hometown':'Moscow','date': new Date()}
        axios.get('http://127.0.0.1:8000/api/users').then(response => {
            const users = response.data
                this.setState(
                {'users': users},
                {'menu_items': menu_items},
                {'footer': footer}
                 )
        }).catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <MenuList menu = {this.state.menu_items}/>
                <UserList users={this.state.users}/>
                <Footer footer={this.state.footer}/>
            </div>
        )
    }
}

export default App;
