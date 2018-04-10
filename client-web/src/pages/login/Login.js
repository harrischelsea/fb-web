import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {APP_ID} from '../../secret/Secret';
import {loginUserFailed, loginUser} from "../../actions/authActions";

class Login extends Component {

    responseFacebook = (response) => {
        this.props.loginUser(response);
    };

    render() {
        if (this.props.auth.isLogged) {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <FacebookLogin
                    appId={APP_ID}
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="user_birthday, user_hometown, user_location, user_likes,
                           user_photos, user_videos, user_friends, user_status, user_tagged_places,
                           user_posts, email, publish_actions, manage_pages, pages_manage_cta,
                           pages_manage_instant_articles, pages_show_list, publish_pages,
                           public_profile, basic_info"
                    callback={this.responseFacebook} />
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { loginUser, loginUserFailed })(Login);
