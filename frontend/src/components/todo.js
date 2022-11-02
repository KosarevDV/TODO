import React from 'react'
import {useParams} from 'react-router-dom'


const TODOItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td>{item.project}</td>
            <td>{item.user}</td>
            <td>{item.text}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
            <td><button onClick={()=>deleteTodo(todo.id)} type='button'>DeleteTODO</button></td>
        </tr>
    )
}


const TODOList = ({items, deleteTodo}) => {
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
                <th></th>
               </tr>
                {filtered_items.map((item) => <TODOItem item={item} deleteTodo={deleteTodo}/>)}
        </table>
)
}
export default TODOList
