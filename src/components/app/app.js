import React, {useEffect, useState} from "react";
import {getCurrentTime} from "../../utils/utils";
import {md5} from "js-md5";
import Header from "../header/header";
import Main from "../main/main";
import Pagination from "../pagination/pagination";

function App() {
    const [items, setItem] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;
    const totalItems = 8004;

    const currentTime = getCurrentTime();
    const newOffset = (currentPage - 1) * itemsPerPage;

    useEffect(() => {
        async function fetchData(){
            try {
                const responseData = await fetch("http://api.valantis.store:40000", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json','Accept': 'application/json', 'X-Auth': md5(`Valantis_${currentTime}`)},
                    body: JSON.stringify({
                        "action": "get_ids",
                        "params": {"offset": newOffset, "limit": itemsPerPage}
                    })
                });

                if (!responseData.ok) {
                    throw new Error(`HTTP error! status: ${responseData.status}`);
                }

                const resultData = await responseData.json();

                const responseItem = await fetch("http://api.valantis.store:40000", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Auth': md5(`Valantis_${currentTime}`)},
                    body: JSON.stringify({
                        "action": "get_items",
                        "params": {"ids": resultData.result}
                    })
                });
                if (!responseItem.ok) {
                    throw new Error(`HTTP error! status: ${responseItem.status}`);
                }

                const resultItems = await responseItem.json();
                const uniqueItems = resultItems.result.reduce((acc, item) => {
                    const existItem = acc.find(el => el.id === item.id);
                    if (!existItem) {
                        acc.push(item);
                    }
                    return acc;
                }, []);

                console.log(resultData, resultItems, uniqueItems)
                setItem(uniqueItems);
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        }
        fetchData();
    }, [currentPage, currentTime, newOffset])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // const lastItemIndex = currentPage * itemsPerPage;
    // const firstITemIndex = lastItemIndex - itemsPerPage;
    // const currentItems = items.slice(firstITemIndex, lastItemIndex);

    return (
        <div className="page">
            <Header />
            <Main items={items}/>
            <Pagination
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalItems={totalItems}
            />
        </div>
    );
}

export default App;
