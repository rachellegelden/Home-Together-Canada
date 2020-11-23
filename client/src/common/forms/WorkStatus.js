/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Const array for dropdown Component
 *
 */

import React, { useState } from 'react';
import Select from "react-select";

const workStatuses = [
    {
        label: "Unemployed",
        value: "Unemployed"
    },
    {
        label: "Student",
        value: "Student"
    },
    {
        label: "Part-time",
        value: "Part-time"
    },
    {
        label: "Full-time",
        value: "Full-time"
    },
    {
        label: "Self-employed",
        value: "Self-employed"
    },
    {
        label: "Retired",
        value: "Retired"
    },
    {
        label: "Other",
        value: "Other"
    }
]

function WorkStatus() {
    const [selectedWorkStatus, setsSelectedWorkStatus] = useState(null);

    const handleStatusChange = e => {
        setsSelectedWorkStatus(e.value);
    }

    return (
        <div>
            <Select isSearchable={true} placeholder={"Work Status"}
                    options={workStatuses} value={workStatuses.find(obj => obj.value === setsSelectedWorkStatus)}
                    onChange={handleStatusChange}/>
        </div>
    )

}
export default WorkStatus;