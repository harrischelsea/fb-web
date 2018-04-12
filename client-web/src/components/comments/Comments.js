import React, { Component } from 'react';

import axios from 'axios';
import { Segment, Input, Button } from 'semantic-ui-react';
import './Comments.css';

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            comment: {},
            err: '',
            commentMSG: '',
        }
    }

    handleComment = e => {
        this.setState({ commentMSG: e.target.value, comment: { message: this.state.commentMSG, from: {name: 'haris', id: '1'}} });
    };

    addCommenet = () => {
        this.setState({ commentMSG: '' ,comments: [ this.state.comment, ...this.state.comments]});
    };

    componentDidMount(){
        if(this.props.comments && this.props.comments.data ){
            this.setState({
                comments: this.props.comments.data
            });
        }
    }

    render() {
        return (
            <div>
                <Segment className='comment'>
                    <Input
                        className='comment-input'
                        placeholder='Napišite komentar...'
                        type='text'
                        fluid
                        value={this.state.commentMSG}
                        onChange={this.handleComment}
                    />
                    <Button onClick={this.addCommenet}>Add comment</Button>

                    {this.state.comments
                        ? this.state.comments.map(el =>
                            <div className='comment-box'>
                            <span className='comment-name'>{el.from.name}</span>
                            <span className='comment-msg'>{el.message}</span>
                            <span className='comment-time'>{el.created_time}</span>
                            </div>
                        )
                        : ''}

                </Segment>
            </div>
        );
    }
}

export default Comments;