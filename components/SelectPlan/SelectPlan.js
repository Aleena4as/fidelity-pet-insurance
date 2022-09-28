import React from 'react'
import TableResponsive from "@/components/TableResponsive/TableResponsive";
import ContentTitle from "@/components/Titles/ContentTitle/ContentTitle";

const SelectPlan = ({stepFirstAccept}) => {
    return (
        <div>
            <ContentTitle title="Select Plan"/>
             <TableResponsive stepFirstAccept={stepFirstAccept}/>
        </div>
    )
}

export default SelectPlan
