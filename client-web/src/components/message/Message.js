import React, { Component } from 'react';

import axios from 'axios';
import { Button, Input } from 'semantic-ui-react';

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: this.props.msg,
            isUpdated: false,
            err: '',
        }
    }

    handleUpdateInput = e => {
        this.setState({ message: e.target.value });
    };

    updatePost = (postID) => {
        axios.post('/api/update-status', { postID, message: this.state.message  })
            .then(res => {
                this.setState({
                    isUpdated: true,
                })
            })
            .catch( () =>
                this.setState({
                    err: 'Error!',
                })
            );
    };

    render() {
        return (
            <div>
                {!(this.props.isUpdating.update && this.props.isUpdating.postID === this.props.postID && this.state.isUpdated === false)
                    ?
                    <h3>{this.state.message}</h3>
                    :
                    <div>
                    <Input
                        fluid
                        type='text'
                        placeholder='Update status...'
                        value={this.state.message}
                        onChange={this.handleUpdateInput}
                    />
                    <Button onClick={() => this.updatePost(this.props.postID)}>Update</Button>
                    </div>
                }
            </div>
        );
    }
}

export default Message;