import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

function RouteRedirect({ component, user, ...rest }) {
    const isAuthenticated = user.id === 0 ? false : true
    const Component = component

    return (
        <Route {...rest}>
            { isAuthenticated 
                ? <Redirect to={{ pathname: '/' }} />
                : <Component />
            }
        </Route>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, null)(RouteRedirect);
