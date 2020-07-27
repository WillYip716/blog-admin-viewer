import React from 'react'
import axios from 'axios';


class CreatePost extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            title: "",
            article: ""
        };
    }

    onChange = (e) => {
        /*
            Because we named the inputs to match their
            corresponding values in state, it's
            super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { title, article } = this.state;
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+localStorage.getItem('blogusertoken')
            }
        };

        axios.post('https://gentle-reaches-06177.herokuapp.com/posts/create', { title, content:article,id:localStorage.getItem('bloguserid')},header)
            .then((result) => {
                if(result.data){
                    this.props.history.push('/post/'+result.data._id);
                }
        });
    }

    render() {
        const { title, article } = this.state;
        return (
            (this.state.loading?(
                <p>Page is loading</p>
            ):(
                <section>
                    <p>Create a post</p>
                    <form onSubmit={this.onSubmit}>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.onChange}
                        />
                        <label>Article:</label>
                        <textarea 
                            className="article_input"
                            type="text"
                            name="article"
                            value={article}
                            onChange={this.onChange}
                        />                 
                        <button type="submit">Submit</button>
                    </form>
                </section>
            )
                   
        ));
    }
    
}
export default CreatePost;