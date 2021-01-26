/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: routes and general navigation for application
 *
 */

import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./home/Home";
import Login from "./login/LoginForm";
import BusinessRegistration from "./registration/BusinessRegistrationForm";
import MemberRegistrationForm from "./registration/MemberRegistrationForm";
import MainLandingPage from "./registration/MainLandingPage";
import AccountSummaryContainer from "./accountSummary/AccountSummaryContainer";
import Error404 from "./common/error/Error404";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {USER_TYPES} from "./common/constants/users";
import Header from "./common/header-and-footer/Header";
import Footer from "./common/header-and-footer/Footer";
import MemberSearchContainer from "./memberSearch/MemberSearchContainer";
import CreateListingContainer from "./createListing/CreateListingContainer";
import TermsOfService from "./termsOfService/TermsOfService";
import PrivacyPolicy from "./termsOfService/PrivacyPolicy";
import ScrollToTop from "./ScrollToTop";

const Navigation = (props) => {
    const {authenticated, accountType} = props;

    return (
        <Router>
            <div>
                <Header/>
                {/* Matches the URL to the path and does not go through the rest of the routes*/}
                <ScrollToTop/>
                <Switch>
                    {/* Renders the correct component based on the URL*/}
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/registration/business"} component={BusinessRegistration}/>
                    <Route path={"/registration/member"} component={MemberRegistrationForm}/>
                    <Route path={"/registration"} component={MainLandingPage}/>
                    <Route path={"/members"} component={MemberSearchContainer}/>
                    <Route path={"/create-listing"} component={CreateListingContainer}/>
                    {(authenticated && accountType !== USER_TYPES.UNREGISTERED) &&
                    <Route path={"/account"} component={AccountSummaryContainer}/>
                    }
                    <Route path={"/tos"} component={TermsOfService}/>
                    <Route path={"/privacy"} component={PrivacyPolicy}/>
                    <Route component={Error404}/>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

Navigation.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string,

}

const mapStateToProps = (state) => ({
    accountType: state.userPrivileges.accountType,
    authenticated: state.userPrivileges.authenticated
});

export default connect(mapStateToProps, null) (Navigation);
