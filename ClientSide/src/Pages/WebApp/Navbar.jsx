import React from 'react';
import Menu from './Menu.jsx';
import LookUpNav from './LookUp-Nav.jsx';
function ProductNavbar({ handleMenuClick }) {
    return (
        <>
            <div className='w-full h-full max-h-15 flex border-b-black border'>
                <Menu handleMenuClick={handleMenuClick}></Menu>
                <LookUpNav></LookUpNav>
            </div>
        </>
    )
};

export default ProductNavbar;