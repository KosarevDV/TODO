import React from 'react'
import {useParams} from 'react-router-dom'


const TODOItem = ({item}) => {
    return (
        <tr>
            <td>{item.project}</td>
            <td>{item.user}</td>
            <td>{item.text}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
        </tr>
    )
}


const TODOList = ({items}) => {
    let id = useParams();
    let filtered_items = items.filter((item) => item.project.id === id)
    return (
        <table>
            <tr>
                <th>Project</th>
                <th>User</th>
                <th>Text</th>
                <th>Created</th>
                <th>Updated</th>
               </tr>
                {filtered_items.map((item) => <TODOItem item={item} />)}
        </table>
)
}
export default TODOList
