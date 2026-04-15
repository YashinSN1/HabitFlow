import Features from './Features'
import Home from './Home.jsx'
import Impact from './Impact.jsx'
import About from './About.jsx'
import NavBar from './Navbar.jsx'

function Homepage() {

    return (
        <>
            <NavBar></NavBar>
            <Home></Home>
            <Features></Features>
            <Impact></Impact>
            <About></About>
        </>
    )
}

export default Homepage
