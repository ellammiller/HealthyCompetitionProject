import React from 'react';
import {User} from '../../../../backend/src/types/User';
import {Link} from 'react-router-dom';


const Participant = (props: User) => {
    return (
        <Link to={`/user/${props.userName}`} >
            <div className="product-item">
                <div className="product-item-content">
                    <div className="p-mb-3">
                        <img src={props.picture} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={props.userName} className="product-image" />
                    </div>
                    <div>
                        <h4 className="p-mb-1">{props.userName}</h4>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export {Participant};
