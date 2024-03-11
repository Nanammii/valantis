import React from 'react';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <p className="header__logo">Valantis</p>
            </div>
        </header>
    );
}

export default React.memo(Header);