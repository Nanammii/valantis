import React from 'react';

function Item({item})  {
    return (
        <div className="item">
            <p className="item__title">{item.product}</p>
            <p>{item.brand}</p>
            <p>{item.price}</p>
        </div>
    );
}

export default React.memo(Item);