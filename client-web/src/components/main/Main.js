import React, { Component } from 'react';

import axios from 'axios';
import Status from '../status/Status';
import Likes from '../likes/Likes';
import Comments from '../comments/Comments';
import Message from '../message/Message';

import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/hr';

import { Segment, Header, Image, Icon, Dropdown, Input, Button } from 'semantic-ui-react';
import './Main.css';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            isUpdating: { update: false, postID: ''},
            err: '',
        }
    }

    deleteStatus = (postID) => {
        axios.post('/api/delete-status', { postID })
            .then(res => {
                this.props.deleteStatus(postID);
                //TODO handle response
            })
            .catch( (err) =>
                { //TODO handle error
                    }
            );
    };

    isUpdating = (postID) => {
        this.setState({ isUpdating: { update: true, postID} });
    };

    render() {
        return (
            <div>
                {this.props.posts.map( (el, i) =>
                    <div key={el.id} style={{margin: '10px'}}>
                    <Segment className='post'>
                        <Header className='name' as='h3'>
                            <Dropdown icon='ellipsis horizontal'>
                                <Dropdown.Menu className='options'>
                                    <Dropdown.Item onClick={() => this.deleteStatus(el.id)} text='Delete' />
                                    <Dropdown.Item onClick={() => this.isUpdating(el.id)} text='Update' />
                                </Dropdown.Menu>
                            </Dropdown>

                            <Image className='status-img' avatar src={this.props.user.picture_url} />
                            {this.props.user.name}
                            {!el.story ? '' : el.story.toString().replace(this.props.user.name, '')}

                            <Moment className='date-time' element='span' locale='hr' tz='Europe/Sarajevo' fromNow>
                                {el.created_time}
                            </Moment>
                        </Header>

                        <h3>{el.message
                            ?
                            <Message msg={el.message} isUpdating={this.state.isUpdating} postID={el.id}/>
                            :
                            ''}
                        </h3>

                        <Image centered src={el.full_picture} />
                    </Segment>

                    <Likes likes={el.likes} postID={el.id} userID={this.props.user.id} name={this.props.user.name}/>
                    <Comments comments={el.comments} postID={el.id} user={this.props.user} />
                    </div>
                )}
            </div>
        );
    }
}

export default Main;