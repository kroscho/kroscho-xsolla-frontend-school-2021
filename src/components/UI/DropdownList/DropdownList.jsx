import React, {useState} from 'react';

import './styles.css'

const DropdownList = ({items, changeItem, defaultSelect}) => {

    const [item, setItem] = useState(defaultSelect);

    const listItems = items.map((item) => {
        return (
            <option  
                key={item.id}              
                value={item.id}
            >
                {item.name}
            </option>
        )
    })

    return (
        <div className="dropdown">
            <select 
                value={item} 
                onChange={(event) => {
                    setItem(event.target.value)
                    changeItem(event.target.value)
                }}
            >
                {listItems}
            </select>
        </div>
    )
}

export default DropdownList;