import React from 'react'

const Footer = ({footer}) => {
    return (
        <div class='footer'>
            {footer.hometown}
            {footer.date}
        </div>
    )
}

export default Footer