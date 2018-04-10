import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from "../../actions/postsActions";

class Home extends Component {

    componentDidMount(){
        this.props.getPosts();
    }

    render() {
        return (
            <div>
                HOME
            </div>
        );
    }
}

const mapStateToProps = ({ posts }) => ({ posts });
export default connect(mapStateToProps, { getPosts })(Home);