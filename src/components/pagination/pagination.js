import React from 'react';

function Pagination({itemsPerPage, currentPage, totalItems, onPageChange}) {
    const pageNumber = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
            pageNumber.push(i);
        }
        pageNumber.push('...');
        pageNumber.push(totalPages);
    } else {
        pageNumber.push(1);
        pageNumber.push('...');
        for (let i = currentPage - 1; i <= currentPage +1; i++) {
            pageNumber.push(i);
        }
        pageNumber.push('...');
        pageNumber.push(totalPages);
    }

    return (
        <div className='pagination'>
            <ul className='pagination__list'>
                {pageNumber.map((number, index) => (
                    <li className={`pagination__item ${currentPage === number ? 'pagination__item--active' : ''}`} key={number}>
                        <a className='pagination__link' href={'!#'}
                           onClick={() => onPageChange(number)}>{number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default React.memo(Pagination);