import React, { Component } from 'react';
//import '../../../node_modules/materialize-css/dist/css/materialize.css';

import { Row, Column } from 'simple-flexbox';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class AdminHomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            text : '',
        };
    }

    handleClick(){
        console.log("Button clicked");
    }

    onChange(event){
        console.log("Change " + event.target.value);
        this.setState({
            text : event.target.value,
        });
    }

    render() {
        return (
        <div>
            <Column
                horizontal='center'
                flexGrow={1}>
                <Row>
                    <h1>PRICE CHECKER PROGRAM</h1>
                </Row>
                <Row flexGrow={1}>

                <Card>
                    <div style={{width : 750}}>
                    <CardContent>
                        <Row horizontal='center' vertical='center' flexGrow={1}>
                            <Column flexGrow={.85}>
                                <TextField
                                id="name"
                                label="Product"
                                value={this.state.text}
                                onChange={this.onChange.bind(this)}
                                margin="normal"
                                />
                            </Column>
                            <Column flexGrow={.15}>
                                <Button variant="contained" onClick={this.handleClick.bind(this)}>Search</Button>
                            </Column>
                        </Row>
                    </CardContent>
                    </div>
                </Card>
                </Row>
            </Column>

            <div class="container">
                <p>Search string: {this.state.text}</p>
            </div>
        </div>
        );
    }
}

export default AdminHomePage;
