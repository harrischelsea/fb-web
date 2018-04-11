import React, { Component } from 'react';

import axios from 'axios';
import Status from '../status/Status';
import Likes from '../likes/Likes';
import Comments from '../comments/Comments';

import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/hr';

import { Segment, Header, Image, Icon, Dropdown } from 'semantic-ui-react';
import './Main.css';

class Main extends Component {

    deleteStatus = (postID) => {
        console.log('kliknuto');

        axios.post('/api/delete-status', { postID })
            .then(res => {
                console.log(res);
            })
            .catch( (err) =>
                console.log(err)
            );
    };

    render() {
        return (
            <div>
                <Status picture={this.props.user.picture_url}/>

                {this.props.posts.map( (el, i) =>
                    <div style={{margin: '10px'}}>
                    <Segment className='post'>
                        <Header className='name' as='h3'>
                            <Dropdown icon='ellipsis horizontal'>
                                <Dropdown.Menu className='options'>
                                    <Dropdown.Item onClick={() => this.deleteStatus(el.id)} text='Delete' />
                                </Dropdown.Menu>
                            </Dropdown>

                            <Image className='status-img' avatar src={this.props.user.picture_url} />
                            {this.props.user.name}
                            {!el.story ? '' : el.story.toString().replace(this.props.user.name, '')}

                            <Moment className='date-time' element='span' locale='hr' tz='Europe/Sarajevo' fromNow>
                                {el.created_time}
                            </Moment>

                        </Header>
                        <h3>{el.message ? el.message : ''}</h3>
                        <Image centered src={el.full_picture} />
                    </Segment>

                    <Likes likes={el.likes} postID={el.id} userID={this.props.user.id} name={this.props.user.name}/>
                    <Comments comments={el.comments} postID={el.id} />
                    </div>
                )}
            </div>
        );
    }
}

export default Main;