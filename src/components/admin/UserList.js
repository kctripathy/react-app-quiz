import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import Layout from '../pages/Layout';
import { ActionTypes } from '../../constants/actionTypes';

function UserList(props) {

	useEffect(()=>{
		console.log('....from user effect');
		this.props.onLoad();
	},[]);


    return (
    	<Layout title="List of users">
        	<p>list of users ...</p>
        </Layout>
    )
};

const mapStateToProps = state => { 
	return { ...state.quiz, ...state.mode, ...state.pager } 
};

const mapDispatchToProps = dispatch => ({
	onLoad: ()=>dispatch({ type: ActionTypes.UserView }),
    onSubmit: payload => dispatch({ type: ActionTypes.UserAdd, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);