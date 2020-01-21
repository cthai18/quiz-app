import React from 'react';
import './styles/Play.css';

export default class Play extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let id = this.props.match.params.id;

        return(
            <div className="container">
                <p>this is the Play component for quiz {id}</p>
            </div>
        )
    }
}