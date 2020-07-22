import React from 'react'
import axios from 'axios';
import CommentField from './commentfield';


class Post extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            loading: true,
            posts: []
        };
    }

    componentDidMount() {
        axios.get('http://10.0.2.15:4000/posts/'+this.props.match.params.id)
          .then(res => {
            const posts = res.data;
            this.setState((state) => ({
                loading: false,
                posts: posts
            }));  
          })
    }

    render(){
        return(
            <div>
            {this.state.loading        
                ? <h1>Post Loading</h1>
                : <div>
                    <h1>{this.state.posts.title}</h1>
                    <p>{this.state.posts.article}</p>
                    <p>{this.state.posts.timestamp}</p> 
                    <CommentField key={this.props.match.params.id} postid={this.props.match.params.id}/>   
                  </div>
                  
            }
            
                
            </div>
        )
    }
    
}
export default Post;