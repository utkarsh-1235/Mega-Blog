import Container from "../Container/Container"
//import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="py-3 shadow bg-gray-500">
       <Container>
       <nav className="flex">
        <div className="mr-4">
            {/* <Link to="/">
                {/* Logo 
            </Link> */}
        </div>
        <ul className="flex ml-auto">

        </ul>
       </nav>
       </Container>
    </header>
  )
}

export default Header
