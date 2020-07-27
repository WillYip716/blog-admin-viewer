import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

function Navbar(){
    const [user, setUser] = useState(""+localStorage.getItem('blogusertoken'));
    const [login, setlogin] = useState("false");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");



    const loginmode = (e) => {
        e.preventDefault();
        setlogin("true");
    }

    const logout = (e) => {
        e.preventDefault();
        setlogin("false");
        setUser("");
        localStorage.removeItem("bloguserid");
        localStorage.removeItem("blogusertoken");
    }

    const onSubmit=(e)=>{
        e.preventDefault();

        axios.post('https://gentle-reaches-06177.herokuapp.com/login', { username, password})
            .then((result) => {
                if(result.data.token){
                    localStorage.setItem('blogusertoken', result.data.token);
                    localStorage.setItem('bloguserid', result.data.userid);
                    setUser(result.data.token);
                    setlogin("false");
                    setusername("");
                    setpassword("");
                }
        });
    }

    function rendercontent(){
         if(user&&user!=="null"){
             return <div><Link to='/createpost'>Create Post</Link><br></br>
             <a href="/" onClick={logout}>Log Out</a></div>;
         }
         else if(login!=="true"){
             return <li><a href="/" onClick={loginmode}>Log in</a></li>;
         }
         else{
             return <section>
             <form onSubmit={onSubmit}>
                 <label>Username:</label>
                 <input
                     type="text"
                     name="username"
                     value={username}
                     onChange={(e) => setusername(e.target.value)}
                 />
                 <label>Password:</label>
                 <input
                     type="password"
                     name="password"
                     value={password}
                     onChange={(e) => setpassword(e.target.value)}
                 />                 
                 <button type="submit">Submit</button>
             </form>
         </section> ;
         }
    };

    return(
        <ul>
                <Link to='/'>Home</Link>
                <div>
                    {rendercontent()}
                </div>
        </ul>
    )   
}


            

export default Navbar;