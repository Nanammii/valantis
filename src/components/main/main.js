import React from 'react';
import List from "../list/list";

function Main({items}) {

    return (
        <main className="page__main">
            <h1 className="visually-hidden">Список товаров</h1>
            <div className="content">
                <div className="content__wrapper container">
                    <section className="content__goods goods">
                        <h2 className="visually-hidden">Товары</h2>
                        {items
                            ? <List list={items}/>
                            : <div>Loading...</div>
                        }
                    </section>
                </div>
            </div>
        </main>
    );
}

export default React.memo(Main);