/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: account summary skeleton
 *
 */

import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import SubPages from "./SubPages";
import {ALL_SUBPAGES, BUSINESS_SUBPAGES, MEMBER_SUBPAGES, USER_TYPES} from "../common/constants/users";
import ChangePasswordContainer from "./ChangePasswordContainer";
import MemberAccountSummary from "./member/MemberAccountSummary";
import memberAccountInfo  from "./member/MockData";
import MemberProfileSummary from "./member/MemberProfileSummary";
import {businessUser} from "./business/MockB";
import BusinessAccountSummary from "./business/BusinessAccountSummary";
import Error404 from "../common/error/Error404";

const AccountSummaryContainer = () => {
    const {accountType, selected} = useLocation().state;

    const options = accountType === USER_TYPES.MEMBER ? MEMBER_SUBPAGES : BUSINESS_SUBPAGES;

    const [selectedSubpage, setSelectedSubpage] = useState(selected);

    const subpageComponent = (subpage) => {
        switch (subpage) {
            case ALL_SUBPAGES.PROFILE:
                return accountType === USER_TYPES.MEMBER ? <MemberProfileSummary memberAccountInfo ={memberAccountInfo }/> : <Error404/>
            case ALL_SUBPAGES.PASSWORD:
                return <ChangePasswordContainer/>
            case ALL_SUBPAGES.MESSAGING:
                return <div>Messaging Component</div>
            case ALL_SUBPAGES.MANAGE_LISTINGS:
                return <div>Manage Listings Component</div>
            default:
                return accountType === USER_TYPES.MEMBER ? <MemberAccountSummary memberAccountInfo ={memberAccountInfo }/> : <BusinessAccountSummary businessAccountInfo={businessUser}/>
        }
    }

    return (
        <div className={"sideBar-container"}>
            <div className={"sideBar"}>
                <SubPages options={options} selected={selectedSubpage} onClick={setSelectedSubpage}/>
            </div>
            <div className={"sideBar-selected-component"}>
                {subpageComponent(selectedSubpage)}
            </div>
        </div>
    )
}

export default AccountSummaryContainer;
