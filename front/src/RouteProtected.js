import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

function RouteProtected({ component, user, ...rest }) {
    const isAuthenticated = user.id === 0 ? false : true
    const Component = component

    return (
        <Route {...rest}>
            { isAuthenticated ?
                <Component />
                :
                <Redirect to={{ pathname: '/login' }} />
            }
        </Route>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, null)(RouteProtected);
