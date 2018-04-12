import React, { Component } from 'react';

import { Segment, Image, Header } from 'semantic-ui-react';
import './Sidebar.css';

class Sidebar extends Component {

    render() {
        return (
            <div>
                <Segment className='segment-sidebar'>
                    <Header as='h3' align='center' className='title'>WELCOME!</Header>
                    <Image className='profile-picture' centered src={this.props.user.picture_url} />
                    <Header as='h3' className='profile-name'>{this.props.user.name}</Header>
                    <Header as='h4'>{this.props.user.email}</Header>
                </Segment>
            </div>
        );
    }
}

export default Sidebar;