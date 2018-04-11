import React, { Component } from 'react';

import { Segment, Input } from 'semantic-ui-react';
import './Sidebar.css';

class Sidebar extends Component {

    render() {
        return (
            <div>
                <Segment className='segment-sidebar'>
                    Sidebar
                </Segment>
            </div>
        );
    }
}

export default Sidebar;