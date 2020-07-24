import React from 'react'
import axios from 'axios';


class Post extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            loading: true,
            title: "",
            article: "",
            timestamp: ""
        };
    }

    componentDidMount() {
        axios.get('http://10.0.2.15:4000/posts/'+this.props.match.params.id)
          .then(res => {
            const posts = res.data;
            this.setState((state) => ({
                loading: false,
                title: posts.title,
                article: posts.article,
                timestamp: posts.timestamp
            }));  
          })
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

        axios.put('http://10.0.2.15:4000/posts/'+this.props.match.params.id, { title, article})
            .then((result) => {
                if(result.data.token){
                    localStorage.setItem('user', result.data.token);
                    this.props.history.push('/');
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
                    <form onSubmit={this.onSubmit}>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.onChange}
                        />
                        <label>Article:</label>
                        <input
                            type="text"
                            name="article"
                            value={article}
                            onChange={this.onChange}
                        />                 
                        <button type="submit">Submit</button>
                    </form>
                    <p>{this.state.timestamp}</p>
                </section>
            )
                   
        ));
    }
    
}
export default Post;