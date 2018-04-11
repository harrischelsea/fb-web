import React, { Component } from 'react';

import axios from 'axios';
import { Segment, Input, Form, Icon, Button } from 'semantic-ui-react';
import './Status.css';

class Status extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: '',
            err: '',
        }
    }

    handleStatus = e => {
        let { status } = this.state;
        this.setState({ status: e.target.value });
    };

    addStatus = () => {
        axios.post('/api/add-status', { status: this.state.status })
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
                <Segment className='add-status'>
                <Input
                    className='status-input'
                    placeholder='Šta Vam je na umu?'
                    type='text'
                    fluid
                    onChange={this.handleStatus}
                />
                    <div className='separation'></div>
                <Button
                    positive
                    className='publish-btn'
                    onClick={this.addStatus}>
                    Objavi
                </Button>
                </Segment>
            </div>
        );
    }
}

export default Status;