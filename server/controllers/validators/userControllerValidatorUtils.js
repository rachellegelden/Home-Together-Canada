/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.16
 *
 * @Description: custom validators to validate input to controller functions to create business and member users
 *
 */
const isNumber = require('lodash/isNumber');
const abstractUserController = require('../abstractUserController');
const memberAccountController = require('../memberAccountController');
const PasswordService = require('../../services/PasswordService');

const PROVINCES = [
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NT',
    'NS',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT'
];

const GENDERS = [
    'Female',
    'Male',
    'Other'
];

const STATUSES = [
    'Single',
    'Couple',
    'Couple With Children',
    'Single Parent',
    'Existing Group'
];

const SHARE_LIMITS = [1, 2, 3, 4, -1];  // -1 means any number of people

const WORK_STATUSES = [
    'Unemployed',
    'Student',
    'Part-time',
    'Full-time',
    'Self-employed',
    'Retired',
    'Semi-retired',
    'Other'
];

const isValidPassword = password => {
    const numbersRegex = /\d+/;         // checks for numbers
    const lowerCaseRegex = /[a-z]/;     // checks for lowercase letters
    const upperCaseRegex = /[A-Z]/;     // checks for uppercase letters

    if (!numbersRegex.test(password) || !lowerCaseRegex.test(password) || !upperCaseRegex.test(password)
        || password.length < 8) {
            throw new Error('Password must contain 8 characters, and at least one number, lower and upper case letter');
    }
    return true;
}

const isValidPhoneNumber = (phoneNum) => {
    if (phoneNum.toString().length !== 10) {
        throw new Error('Phone number must be 10 digits long')
    }
    else {
        return true;    // Indicates the success of this synchronous custom validator. See - https://github.com/express-validator/express-validator/issues/619
    }
};

// This regex does cover the case A1A 1A1, input must be normalized before validating
const isValidCanadianPostalCode = (postalCode) => {
    const regex = RegExp('^([A-Za-z]\\d[A-Za-z][-]?\\d[A-Za-z]\\d)');
    if (!regex.test(postalCode)) {
        throw new Error('Invalid postal code');
    } else {
        return true;
    }
};

const shouldMailingAddressBeDefined = (addressPart, req) => {
    if (req.body.hasDifferentMailingAddress && !addressPart) {
        throw new Error('Address must be defined');
    } else {
        return true;
    }
};

const shouldMapAddressBeDefined = (addressPart, req) => {
    if (!req.body.isNationWide && !addressPart) {
        throw new Error('Address must be defined');
    } else {
        return true;
    }
};

const shouldIncorporatedOwnersNamesBeDefined = (incorporatedOwnersNames, req) => {
    if (req.body.isIncorporated && !incorporatedOwnersNames) {
        throw new Error(`Incorporated owners' names must be defined`);
    } else {
        return true;
    }
};

const isPositiveInteger = (num) => {
    if (num === undefined || num === null || num < 0) {
        throw new Error('Must provide a positive value');
    } else {
        return true;
    }
}

const validateMinAndMax = (min, max) => {
    if (!isNumber(min) || !isNumber(max) || min > max) {
        throw new Error('Min is greater than the max');
    } else {
        return true;
    }
}

const validStatusPreferences = (statuses) => {
    if (!statuses || !statuses.length) {
        throw new Error('Status list is empty');
    } else {
        statuses.forEach(status => {
            if (!STATUSES.includes(status)) {
                throw new Error('Status is not included valid statuses');
            }
        });
    }
    return true;
}

const validGenderPreferences = (genders) => {
    if (!genders || !genders.length) {
        throw new Error('Gender preferences list is empty');
    } else {
        genders.forEach(gender => {
            if (!GENDERS.includes(gender)) {
                throw new Error('Gender is not included in valid genders');
            }
        });
    }
    return true;
}

const isValidShareLimit = (limit) => SHARE_LIMITS.includes(limit);

const isValidAreasOfInterest = (areasOfInterest) => {
    if (!!areasOfInterest && areasOfInterest.length > 0) {
        areasOfInterest.forEach(areaOfInterest => {
            if (!areaOfInterest || !areaOfInterest.province || !areaOfInterest.city || !isNumber(areaOfInterest.radius)) {
                throw new Error('Area of interest must include province, city and radius properties');
            } else if (!PROVINCES.includes(areaOfInterest.province)) {
                throw new Error('Must provide a valid Canadian Province');
            } else if (parseInt(areaOfInterest.radius) < 0) {
                // TODO: look into if there should be a max radius
                throw new Error('Radius must be positive');
            }
        });
    } else if (!areasOfInterest || (!!areasOfInterest && !areasOfInterest.length)) {
        throw new Error('At least one area of interest must be provided');
    }
    return true;
}

const usernameShouldNotAlreadyExist = (username) =>
    abstractUserController.findUserByUsername(username)
        .then(user => {
            if (user.length) {
                return Promise.reject('User already exists');
            }
        });

const emailShouldNotAlreadyBeInUse = (email) =>
    abstractUserController.findUserByEmail(email)
        .then(user => {
            if (user.length) {
                return Promise.reject('Email already in use');
            }
        });

const usernameShouldExist = (username) =>
    abstractUserController.findUserByUsername(username)
        .then(user => {
            if (!user.length) {
                return Promise.reject('Username does not exist');
            }
        });

const usernameShouldExistAndBeAMember = (username) => {
    return memberAccountController.findMemberAccountByUsername(username)
        .then(member => {
            if (!!member && !member.length) {
                return Promise.reject(`That member's username does not exist`);
            }
        });
}

const linkedMemberShouldHaveSameStatus = (username, req) => {
    return memberAccountController.findMemberAccountByUsername(username)
        .then(member => {
            if (!!member && member.length && member[0].dataValues.status !== req.body.status) {
                return Promise.reject(`Member and linked username must share the same status`);
            }
        });
}

const providedPasswordShouldMatchExistingPassword = (password, uid) => {
    return abstractUserController.findAbstractUser(uid)
        .then(userObject => {
            if (!userObject) {
                return Promise.reject('User cannot be found');
            } else {
                const user = userObject.dataValues;
                const hashedPassword = PasswordService.getHashedPassword(password, user.salt);

                if (hashedPassword !== user.password) {
                    return Promise.reject(`Old password is incorrect`);
                }
            }
        });
}

const providedNewPasswordShouldNotMatchExistingPassword = (password, uid) => {
    return abstractUserController.findAbstractUser(uid)
        .then(userObject => {
            if (!userObject) {
                return Promise.reject('User cannot be found');
            } else {
                const user = userObject.dataValues;
                const hashedPassword = PasswordService.getHashedPassword(password, user.salt);

                if (hashedPassword === user.password) {
                    return Promise.reject('New password cannot be the same as previous password');
                }
            }
        });
}

const correctPasswordForUsername = (username, password) =>
    abstractUserController.findUserByUsername(username)
        .then(users => {
            if (users.length) {
                const user = users[0].dataValues;
                const hashedPassword = PasswordService.getHashedPassword(password, user.salt);

                if (hashedPassword !== user.password) {
                    return Promise.reject('Incorrect password');
                }
            } else {
                return Promise.reject('Incorrect username');
            }
    });

module.exports = {
    PROVINCES,
    GENDERS,
    STATUSES,
    WORK_STATUSES,
    isValidPassword,
    isValidPhoneNumber,
    isValidCanadianPostalCode,
    shouldMailingAddressBeDefined,
    shouldMapAddressBeDefined,
    shouldIncorporatedOwnersNamesBeDefined,
    isPositiveInteger,
    validateMinAndMax,
    validStatusPreferences,
    validGenderPreferences,
    isValidShareLimit,
    isValidAreasOfInterest,
    usernameShouldNotAlreadyExist,
    emailShouldNotAlreadyBeInUse,
    usernameShouldExist,
    usernameShouldExistAndBeAMember,
    linkedMemberShouldHaveSameStatus,
    providedPasswordShouldMatchExistingPassword,
    providedNewPasswordShouldNotMatchExistingPassword,
    correctPasswordForUsername
}
