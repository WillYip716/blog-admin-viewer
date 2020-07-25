import React from 'react'
import axios from 'axios';


class Post extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            loading: true,
            title: "",
            article: "",
            timestamp: "",
            published: ""
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
                timestamp: posts.timestamp,
                published: posts.published
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
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+localStorage.getItem('blogusertoken')
            }
        };

        axios.put('http://10.0.2.15:4000/posts/'+this.props.match.params.id, { title, content:article},header)
            .then((result) => {
                if(result.data){
                    this.setState((state) => ({
                        timestamp: result.data.timestamp,
                    }));
                   
                }
        });
    }

    publishtoggle = (e) => {
        e.preventDefault();
        // get our form data out of state
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+localStorage.getItem('blogusertoken')
            }
        };

        axios.put('http://10.0.2.15:4000/posts/'+this.props.match.params.id+'/publish', {},header)
            .then((result) => {
                if(result.data){
                    this.setState((state) => ({
                        published: result.data.published,
                    }));             
                }
        });
    }

    deletebutton = (e) => {
        e.preventDefault();
        // get our form data out of state
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+localStorage.getItem('blogusertoken')
            }
        };

        axios.delete('http://10.0.2.15:4000/posts/'+this.props.match.params.id+'/delete',header)
            .then((result) => {
                this.props.history.push('/');
        });
    }

    render() {
        const { title, article } = this.state;
        return (
            (this.state.loading?(
                <p>Page is loading</p>
            ):(
                <section>
                    <button onClick={this.publishtoggle}>{this.state.published?'Unpublish':'Publish'}</button>
                    <button onClick={this.deletebutton}>DELETE</button>
                    <p>Updated {this.state.timestamp}</p>
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
export default Post;