import React from 'react';
import { Carousel } from 'primereact/carousel';
import {User} from '../../../../backend/src/types/User';
import {Participant} from "./Participant";
import './GameParticipants.scss';

//todo: turn this into a proper use of props
const GameParticipants = (props: Array<User>) => {


    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    
    ];
    
    return(
        <div className="card">
            <Carousel value={props} numVisible={8} numScroll={4} responsiveOptions={responsiveOptions}
                itemTemplate={Participant} header={<h5>Participants</h5>} />
        </div>
    )

}

export default GameParticipants;                  
