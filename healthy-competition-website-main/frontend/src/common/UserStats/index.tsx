import React from 'react';

interface UserStatsProps {
        goal: number,
        starting: number | undefined,
        current: number | undefined
}

const UserStats = (props : UserStatsProps): JSX.Element => {
    const {goal, starting, current} = props;

    return (
        <div className="p-mb-4 p-d-flex p-jc-center">
            <div className='p-mr-4 p-ml-4' style={{textAlign: "center"}}>
                <h5>Goal Weight</h5> 
                <div>{goal} lbs</div>
            </div>
            <div className='p-mr-4 p-ml-4' style={{textAlign: "center"}}>
                <h5>Starting Weight</h5>
                <div>{starting ? starting : 'N/A'} lbs </div>
            </div>
            <div className='p-mr-4 p-ml-4' style={{textAlign: "center"}}>
                <h5>Current Weight</h5>
                <div>{current ? current : 'N/A'} lbs </div>
            </div>
            <div className='p-mr-4 p-ml-4' style={{textAlign: "center"}}>
                <h5>Total Weight Change</h5> 
                <div>{starting && current ? starting - current : 'N/A'} lbs </div>
            </div>
            <div className='p-mr-4 p-ml-4' style={{textAlign: "center"}}>
                <h5>Weight Change Until Goal</h5>
                <div>{current ? current - goal : 'N/A'} lbs</div>
            </div>
        </div>
    );
};

export default UserStats;
