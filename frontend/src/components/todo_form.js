import React from 'react'


class TODOForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {project: props.projects[0].id , text: '', users: []}
    }


    handleUserChange(event){
    if (!event.target.SelectedOptions){
            this.setState({users:[]})
            return;
        }
        let users = []
        for(let i=0; i < event.target.selectedOptions.length; i++){
            users.push(event.target.selectedOptions.item(i).value)}
        this.setState({'users': users})
    }


    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }


    handleSubmit(event) {
        this.props.createTODO(this.state.project, this.state.text, this.state.users)
        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="projects">projects</label>
                        <select name='projects' className="form-control" onChange={(event)=>this.handleChange(event)} />
                        {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
                </div>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="text" placeholder="TO DO"
                    value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="users">users</label>
                    <select name='users' className="form-control" multiple onChange={(event)=>this.handleUserChange(event)} />
                        {this.props.users.map((item)=><option value={item.id}>{item.name}</option>)}
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}


export default TODOForm
