
import './Navbar.css'
import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>
                <Link to={`/`}>DevBlog</Link>
            </h2>
            <ul>
                <li>
                    <Link to={`/`}>Home</Link>
                </li>
                <li>
                    <Link to={`/new`} className='new-btn'>Novo Post</Link>
                </li>
            </ul>
        </nav>
    )
}