import React from 'react'
import { useParams } from 'react-router-dom'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
//            <td>{user.TODO.text}</td>
        </tr>
    )
}

const ProjectUserList = ({items}) => {
    let { id } = useParams();  // позволит получить параметры, переданные в адрес роутера
//    let id = useParams();
    let filtered_items = items.filter((item) => item.project.id == id)  //получаем участников проекта
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
//                <th>NOTE</th>
            </tr>
            {filtered_items.map((item) => <UserItem item={item} />)}
        </table>
    )
}

export default ProjectUserList
