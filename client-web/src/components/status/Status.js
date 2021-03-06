import React, { Component } from 'react';

import axios from 'axios';
import { Segment, Input, Form, Icon, Button, Header } from 'semantic-ui-react';
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
        axios.post('/api/add-status', { message: this.state.status })
            .then(res => {
                this.setState({ status: '' });
                this.props.getStatus(res.data.id);
            })
            .catch( () =>
                this.setState({ err: 'Error!' })
            );
    };

    render() {
        return (
            <div>
                <Segment key='status' className='add-status'>
                    <Header className='title' as='h3'>Dodajte status!</Header>
                <Input
                    className='status-input'
                    placeholder='Šta Vam je na umu?'
                    type='text'
                    fluid
                    value={this.state.status}
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