/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for MemberAccount model
 *
 */

const db = require('../models');
const MemberAccount = db.memberAccount;
const AbstractUser = db.abstractUser;

const createMemberAccount = (req, uid) => {

    // TODO: add preference fields when implementing search filters
    const memberAccount = {
        uid: uid,
        isAdmin: false, // an account should be given admin privileges after its creation
        gender: req.body.gender,
        genderDescription: req.body.genderDescription,
        birthYear: req.body.birthYear,
        status: req.body.status,
        minMonthlyBudget: req.body.minMonthlyBudget,
        maxMonthlyBudget: req.body.maxMonthlyBudget,
        hasHomeToShare: req.body.hasHomeToShare,
        homeToShareDescription: req.body.homeToShareDescription,
        isReligionImportant: req.body.isReligionImportant,
        religionDescription: req.body.religionDescription,
        isDietImportant: req.body.isDietImportant,
        dietDescription: req.body.dietDescription,
        hasHealthMobilityIssues: req.body.hasHealthMobilityIssues,
        healthMobilityIssuesDescription: req.body.healthMobilityIssuesDescription,
        hasAllergies: req.body.hasAllergies,
        allergiesDescription: req.body.allergiesDescription,
        hasPets: req.body.hasPets,
        petsDescription: req.body.petsDescription,
        isSmoker: req.body.isSmoker,
        smokingDescription: req.body.smokingDescription,
        numRoommates: req.body.numRoommates,
        bio: req.body.bio,
    }

    return MemberAccount.create(memberAccount);
}

const findAllMemberAccounts = (req, res) => {
    MemberAccount.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

const findMemberAccountByUsername = (username) => {
    return MemberAccount.findAll({
        include: [
            {
                model: AbstractUser,
                where: {
                    username: username
                }
            }
        ]
    })
}

module.exports = {
    createMemberAccount,
    findAllMemberAccounts,
    findMemberAccountByUsername
}