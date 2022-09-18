import React from 'react'


const MenuItem = ({menu}) => {
    return (
    <a class="menu" href="#">{menu}</a>
    )
}

const MenuList = ({menu_items}) => {
    return (
        <div class='menu_item'>
            {menu_items.map((menu) => <MenuItem menu={menu}/>)}
        </div>
    )
}

export default MenuList