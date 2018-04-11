import React, { Component } from 'react';

import axios from 'axios';
import { Segment, Modal, Header, Icon } from 'semantic-ui-react';
import './Likes.css';

class Likes extends Component {
    constructor(props){
        super(props);
        this.state = {
            likes: [],
            isLiked: false,
        }
    }

    addLike = (postID) => {
        axios.post('/api/add-like', { postID, newLike: {name: this.props.name, id: this.props.userID} })
            .then(res => {
                let { likes }= this.state;
                this.setState({
                    likes: [...likes, {name: this.props.name, id: this.props.userID}],
                    isLiked: true,
                })
            })
            .catch( () =>
                console.log('err!')
            );
    };

    deleteLike = (postID) => {
        axios.post('/api/delete-like', { postID, deleteLike: {name: this.props.name, id: this.props.userID} })
            .then(res => {
                let { likes }= this.state;
                let x = likes.splice(0, 1);
                this.setState({
                    likes: x,
                    isLiked: false,
                })
            })
            .catch( () =>
                console.log('err!')
            );
    };

    componentDidMount(){
        if(this.props.likes && this.props.likes.data ){
            this.setState({
                likes: this.props.likes.data
            });
        }
        if(this.props.likes && this.props.likes.data.find(el => el.id === this.props.userID)){
            this.setState({
                isLiked: true,
            });
        }
    }

    render() {
        return (
            <div>
                <Segment className='likes'>
                    <span>
                        <Icon
                            className={
                                this.state.likes && this.state.likes.find(el => el.id === this.props.userID)
                                ? 'like'
                                : 'like outline'
                            }
                            onClick={
                                this.state.isLiked === true
                                ?
                                () => this.deleteLike(this.props.postID)
                                :
                                () => this.addLike(this.props.postID)
                            }
                        />
                    </span>

                    {this.state.likes && this.state.likes.length
                        ?
                        <Modal size='mini'
                           trigger={
                               <span className='span-like-click'>
                                   { this.state.likes.length === 1
                                       ? this.state.likes[0].name
                                       : this.state.likes[0].name + ' and ' + (this.state.likes.length-1) + 'other'
                                   }
                               </span>
                           }>
                            <Header>{this.state.likes.length} likes</Header>
                            <Modal.Content scrolling>
                                {this.state.likes.map( (el, i) =>
                                <p>{el.name}</p>
                        )}
                            </Modal.Content>
                        </Modal>
                        : ''}
                </Segment>
            </div>
        );
    }
}

export default Likes;