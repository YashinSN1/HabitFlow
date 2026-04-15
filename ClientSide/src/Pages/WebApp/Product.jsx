import ProductNavbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import Sidebar from './Sidebar.jsx';
import React from 'react';
function Product() {
    let [ismenuclicked, setIsMenuClicked] = React.useState(false);
    
    function handleMenuClick() {
        setIsMenuClicked(!ismenuclicked);
    }


    return (
        <div className='w-screen h-screen'>
            <div className='w-full h-full flex flex-col'>
                <ProductNavbar handleMenuClick={handleMenuClick}></ProductNavbar>
                <div className='flex w-full h-full'>
                    <Sidebar MenuClicked={ismenuclicked}></Sidebar>
                    <Hero></Hero>
                </div>
            </div>
        </div>
    )
}

export default Product
