import React from 'react'


const Footer = () => {
    return (
        <ul class="footer_list">
            <li class="footer_item">
                <div>Москва</div>
            </li>
            <li class="footer_item">
                <div>{new Date().toLocaleDateString()}</div>
            </li>
       </ul>
    )
}

export default Footer