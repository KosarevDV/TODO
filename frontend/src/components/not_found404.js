import React from'react';
import {useLocation} from 'react-router-dom';


const NotFound404 = () => {
    let {pathname} = useLocation()
    return (
        <div>
            <h1>Страница по адресу '{pathname}' не найдена</h1>
        </div>
    )
}


export default NotFound404
