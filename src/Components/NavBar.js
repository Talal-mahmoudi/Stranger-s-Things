import { Link } from "react-router-dom";

const NavBar = (props) =>{

    return(
        <div>
            <nav>
                <div>
                    <h2>Stranger's Things</h2>
                </div>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    Posts
                </div>
                <div>
                    Profile
                </div>
                <div>
                    Logout
                </div>
            </nav>
        </div>

    )


}
export default NavBar;