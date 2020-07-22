import React from 'react'
import axios from 'axios';

class CommentField extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            loading: true,
            comments: [],
            author: "",
            comment: ""
        };
    }

    componentDidMount() {
        axios.get('http://10.0.2.15:4000/posts/'+this.props.postid+'/comments')
          .then(res => {
            const comments = res.data;
            this.setState((state) => ({
                loading: false,
                comments: comments
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
        const { author, comment } = this.state;

        axios.post('http://10.0.2.15:4000/posts/'+this.props.postid+'/comment', { author, content:comment})
            .then((result) => {
                const commentlist = this.state.comments;
                commentlist.push(result.data);
                this.setState((state) => ({
                    comments: commentlist,
                    author: "",
                    comment: ""
                })); 
        });
    }

    render() {
        const { author, comment } = this.state;
        return (
            <section>
                
                {this.state.comments.map((c,index) => (
                    <div key={index}>
                        <p>{c.content}</p>
                        <p>{c.author}</p>
                        <p>{c.timestamp}</p>
                    </div>
                ))}
                
                <form onSubmit={this.onSubmit}>
                    <label>Comment:</label>
                    <input
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={this.onChange}
                    />
                    <label>Name:</label>
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={this.onChange}
                    />                 
                    <button type="submit">Submit</button>
                </form>
            </section>       
        );
    }
}

export default CommentField;