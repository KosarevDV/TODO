import React from 'react'


const MenuList = () => {
    return (
         <div class="header_menu">
            <ul class="menu_list">
               <li class="menu_item">
                    <a class='menu_link'href="users">Пользователи</a>
               </li>
               <li class="menu_item">
                    <a class='menu_link'href="projects">Проекты</a>
               </li>
               <li class="menu_item">
                    <a class='menu_link'href="todo">Заметки</a>
               </li>
            </ul>
        </div>
    )
}

export default MenuList