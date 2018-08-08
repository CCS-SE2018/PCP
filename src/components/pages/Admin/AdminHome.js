import React, { Component } from 'react';
//import '../../../node_modules/materialize-css/dist/css/materialize.css';

import { Row, Column } from 'simple-flexbox';

class HomePage extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
        <div>
            <Column 
                horizontal='center' 
                flexGrow={1}>
                <Row>
                    <h1>ADMIN HOME</h1>
                </Row>
            </Column>
        </div>
        );
    }
}

export default HomePage;
