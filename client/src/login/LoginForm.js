/**
 * @Author:     Alex Qin
 * @Created:    2020.11.15
 *
 * @Updated-by: Parsa Rajabi
 * @Updated: 2020.11.19
 *
 * @Description: User Login Form with Validation:
 *
 */
import React, {useState} from 'react'
import TextArea from '../common/forms/TextArea';
import SubmitButton from '../common/forms/SubmitButton';
import {isStringEmpty} from '../common/utils/stringUtils';
import TypingPicture from '../images/typing.jpg';
import GenericInput from '../common/forms/GenericInput';
import {Link} from 'react-router-dom';
import LoginService from '../services/LoginService';
import {getConcatenatedErrorMessage} from "../registration/registrationUtils";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {setIsAdmin, setAccountType, setAuthenticated} from "../redux/slices/userPrivileges";
import {USER_TYPES} from "../common/constants/users";

const mapDispatch = { setIsAdmin, setAccountType, setAuthenticated };

function LoginForm(props) {
    const { history, setIsAdmin, setAccountType, setAuthenticated } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // TODO: create an array of errors
    const isFormValid = () => {
        if (isStringEmpty(username)) {
            alert("Username Required.");
            return false;
        }
        if (isStringEmpty(password)) {
            alert("password Required.");
            return false;
        }
        return true;
    }

    const onSubmit = (event) => {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        const loginData = {
            username: username,
            password: password
        }

        LoginService.loginUser(loginData)
            .then(res => res.json())
            .then(data => {
                if (!!data && data.authenticated) {
                    // dispatch action to set isAdmin
                    setIsAdmin({isAdmin: data.member ? data.member.isAdmin : false});

                    // dispatch action to set accountType
                    let accountType = null;
                    if (data.member) {
                        accountType = USER_TYPES.MEMBER;
                    } else if (data.business) {
                        accountType = USER_TYPES.BUSINESS;
                    }
                    setAccountType({accountType});

                    // dispatch action to set authenticated
                    setAuthenticated({ authenticated: data.authenticated });

                    // user is authenticated, redirect to home screen
                    return history.push('/');
                } else if (!!data && !data.authenticated) {
                    // something went wrong with authentication
                    alert('Login failed');
                } else if (!!data && data.errors && data.errors.length) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    // show list of all errors
                    alert(errorMessage);
                }
            })
            .catch((error) => {
                alert('Something went wrong creating your user. Please try again. Error: ' + error);
            });
    }

    return (
        <div>
            <div className="flex items-center min-h-screen p-6 bg-off_white">
                <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl ">
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img
                                className="object-cover w-full h-full"
                                src={TypingPicture}
                                alt="Typing behind a computer"
                            />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">
                                <h1 className="h1">
                                    Login
                                </h1>
                                <TextArea className="input" label={''}
                                          inputType="text" placeholder="Username" onChange={(input) => {
                                    setUsername(input.target.value)
                                }}/>

                                <GenericInput className="input" label={''}
                                              inputType="password" placeholder="Password" onChange={(input) => {
                                    setPassword(input.target.value)
                                }}/>

                                {/* TODO: replace alerts with css warning i.e make the input box red and add a text:
                                 "Please enter a password / Password is invalid*/}

                                    <SubmitButton
                                        className="block px-4 py-2 mt-4 text-sm font-medium text-center btn btn-green"
                                        inputValue='Login' onClick={onSubmit}/>

                                {/* TODO: remember me feature, using the checkbox function*/}
                                {/*<Checkbox label="Remember me "/>*/}

                                <hr className="my-8"/>

                                <Link to={'/forgot-password'} className="link"> Forgot your password?
                                </Link>
                                <Link to={'/registration'} className="link"> Create an account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

LoginForm.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    })
}

export default connect(null, mapDispatch) (LoginForm);
