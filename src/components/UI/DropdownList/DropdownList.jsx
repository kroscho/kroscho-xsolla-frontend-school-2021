import React, {useState, useContext} from 'react';

import './styles.css'

const DropdownList = ({data, items}) => {

    const [item, setItem] = useState(1);
    console.log(items)

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
                onChange={(event) => setItem(event.target.value)}
            >
                {listItems}
            </select>
        </div>
    )
}

export default DropdownList;