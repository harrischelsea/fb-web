import React, { Component } from 'react';

import axios from 'axios';
import { Segment, Input, Button, Image } from 'semantic-ui-react';
import './Comments.css';

import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/hr';

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
        this.setState({
            commentMSG: e.target.value,
            comment: { message: this.state.commentMSG, from: {name: this.props.user.name, id: this.props.user.id}}
        });
    };

    addCommenet = (postID) => {
        axios.post('/api/add-comment',
            {
            postID,
            newComment: {name: this.props.user.name, id: this.props.user.id, current_time: Date.now(), message: this.state.commentMSG }
            })
            .then(res => {
                this.setState({
                    commentMSG: '' ,
                    comments: [ this.state.comment, ...this.state.comments ]
                });
            })
            .catch( () =>
                this.setState({
                    err: 'Error!',
                })
            );
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
                        action={{ content: 'Add comment', className: 'input-btn', onClick: () => this.addCommenet(this.props.postID) }}
                    />

                    {this.state.comments
                        ? this.state.comments.map(el =>
                            <div className='comment-box'>
                            <div className='comment-msg'>
                                <Image avatar src={this.props.user.picture_url} />
                                <span className='comment-name'>{el.from.name}</span>
                                {el.message}
                                <div className='comment-time'>
                                    <Moment element='div' locale='hr' tz='Europe/Sarajevo' fromNow>
                                        {el.created_time}
                                    </Moment>
                                </div>
                                </div>

                            </div>
                        )
                        : ''}

                </Segment>
            </div>
        );
    }
}

export default Comments;