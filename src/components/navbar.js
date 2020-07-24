import React from 'react'
import {Link} from 'react-router-dom'

function Navbar(){
    //const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const user = localStorage.getItem('user');
    console.log(user);
    return(
        <ul>
                <Link to='/'>Home</Link>
                {user&&user!==undefined ? (
                    <li>
                        <Link to='/createpost'>Create Post</Link>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                )}
        </ul>
    )   
}

export default Navbar;