import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts, getStatus } from "../../actions/postsActions";
import { getCurrentUser } from "../../actions/currentUserActions";
import { signOutUser } from "../../actions/authActions";

import { Grid, Container, Loader } from 'semantic-ui-react';
import Main from '../../components/main/Main';
import Sidebar from '../../components/sidebar/Sidebar';
import Status from '../../components/status/Status';

class Home extends Component {

    componentDidMount() {
        this.props.getPosts();
        this.props.getCurrentUser();
    }

    render() {
        if (!this.props.auth.isLogged) return <Redirect to='/login' />;
        if (this.props.posts.loading) return <div style={{marginTop: '20%'}}><Loader active inline='centered' /></div>;
        return (
            <div style={{background: '#e9ebee'}}>
            <Container>
            <Grid>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Sidebar user={this.props.user.user} signOutUser={this.props.signOutUser} />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={12}>
                    <Status picture={this.props.user.user.picture_url} getStatus={this.props.getStatus} />
                    <Main user={this.props.user.user} posts={this.props.posts.posts} getAllPosts={this.props.getPosts} />
                </Grid.Column>
            </Grid>
            </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ posts, user, auth }) => ({ posts, user, auth });
export default connect(mapStateToProps, { getPosts, getCurrentUser, signOutUser, getStatus })(Home);