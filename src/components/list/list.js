import React from 'react';
import Item from "../item/item";

function List({list}) {
    return (
        <ul className="goods__list">
            {list.map((el) => (
                <li className="goods__item" key={el.id}>
                    <Item item={el} />
                </li>
            ))}
        </ul>
    );
}

export default React.memo(List);