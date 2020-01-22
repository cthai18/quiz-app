import React from 'react';
import './styles/Play.css';

import { useParams } from 'react-router-dom';

const Play = (props) => {
    let { id } = useParams();

    return(
        <div className="container">
            <p>this is the Play component for quiz {id}</p>
        </div>
    )
}

export default Play;