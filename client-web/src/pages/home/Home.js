import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPosts } from "../../actions/postsActions";
import { getCurrentUser } from "../../actions/currentUserActions";

import {Grid, Container} from 'semantic-ui-react';
import Main from '../../components/main/Main';
import Sidebar from '../../components/sidebar/Sidebar';

class Home extends Component {

    componentDidMount() {
        this.props.getPosts();
        this.props.getCurrentUser();
    }

    render() {
        if (this.props.posts.loading) return <div>LOADING...</div>;
        return (
            <div style={{background: '#e9ebee'}}>
            <Container>
            <Grid>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Sidebar/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={12}>
                    <Main user={this.props.user.user} posts={this.props.posts.posts}/>
                </Grid.Column>
            </Grid>
            </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ posts, user }) => ({ posts, user });
export default connect(mapStateToProps, { getPosts, getCurrentUser })(Home);