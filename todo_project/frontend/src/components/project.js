import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td><Link to={`projects/${project.id}`}>{project.name}</Link></td>
            <td>{project.repo_link}</td>
            <td>{project.user}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>Project</th>
            <th>Link</th>
            <th>User</th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList