import React, { Component } from 'react';

import axios from 'axios';
import { Segment, Input } from 'semantic-ui-react';
import './Comments.css';

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: '',
            err: '',
        }
    }

    handleComment = e => {
        this.setState({ comment: e.target.value });
    };

    addCommenet = () => {
        axios.post('/api/add-comment', { comment: this.state.comment })
            .then(res => {
                console.log(res.data);
                this.setState({ status: '' });
            })
            .catch( () =>
                this.setState({ err: 'Error!' })
            );
    };

    render() {
        return (
            <div>
                <Segment className='comment'>
                    <Input
                        className='comment-input'
                        placeholder='Napišite komentar...'
                        type='text'
                        fluid
                        onChange={this.handleComment}
                    />

                    {this.props.comments
                        ? this.props.comments.data.map(el =>
                            <div>
                            <span>{el.from.name}</span>
                            <span>{el.message}</span>
                            <span>{el.created_time}</span>
                            </div>
                        )
                        : ''}

                </Segment>
            </div>
        );
    }
}

export default Comments;