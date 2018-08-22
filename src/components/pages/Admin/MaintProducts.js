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
                    <Column>
                        <h1>Products</h1>
                        
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel velit in neque congue imperdiet vitae sed arcu. Vestibulum vitae nisl lacinia, commodo enim non, tempus turpis. Sed interdum tincidunt felis, vel efficitur eros pellentesque et. Quisque imperdiet dui id arcu tristique, et hendrerit lacus scelerisque. Nam finibus ullamcorper orci vitae molestie. Nam hendrerit sed metus in luctus. Donec placerat pulvinar lacinia. Phasellus non velit vitae tellus vestibulum lobortis. Quisque vestibulum euismod scelerisque. Nunc scelerisque convallis velit sed dapibus. In maximus libero luctus, tristique dui quis, semper felis. Nam scelerisque metus mi, sit amet auctor magna varius in.</p>

                        <p>Quisque quam eros, semper vehicula neque a, rutrum eleifend sapien. Quisque pulvinar vulputate libero. Proin gravida dolor non est maximus, id ornare dui luctus. Sed tempor, dui at scelerisque feugiat, purus quam malesuada ex, quis tempor turpis libero vitae ante. Nunc sit amet tempus nibh. Nullam vitae dolor in tortor porttitor vulputate. Nunc eget sapien neque. Integer ultricies justo nec commodo fermentum. Vivamus hendrerit non nibh eu cursus. Aliquam ac interdum dolor. Quisque nibh odio, tempus sed mattis non, posuere nec mi. Curabitur eleifend at est in fringilla.</p>

                        <p>Morbi id porttitor ex, sit amet malesuada purus. Etiam vitae semper quam. Aenean tincidunt urna non enim laoreet, a tincidunt leo sagittis. Fusce nec orci tortor. Suspendisse cursus, lorem sit amet efficitur condimentum, ipsum ante fermentum elit, ac mollis orci ante id dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse congue et arcu placerat pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse ligula ligula, vehicula sed porttitor et, venenatis dignissim mauris. Integer viverra pulvinar leo eu fermentum. Aliquam erat volutpat. Proin id aliquam est, gravida vestibulum mauris. Duis pellentesque molestie posuere. Phasellus consequat diam diam, quis pulvinar purus porttitor rhoncus. Quisque mollis, mi sed pellentesque finibus, risus mauris fringilla metus, id blandit ante enim eget lectus.</p>

                        <p>Vestibulum tortor augue, efficitur ac condimentum a, porttitor at eros. Ut scelerisque, enim eu lobortis aliquet, magna mi congue nisi, ut vestibulum sapien massa in ex. In sed urna sed nibh venenatis ullamcorper. Donec orci sem, vestibulum vel mauris in, commodo dapibus turpis. Cras mollis sodales purus. In ultrices semper finibus. Cras condimentum purus iaculis, venenatis erat ut, blandit velit. Pellentesque eget elementum ligula. Praesent tempus mi imperdiet erat commodo, egestas lacinia turpis interdum. Maecenas interdum consequat arcu, ac maximus metus rutrum eget. Maecenas posuere metus diam. Vestibulum viverra fringilla sapien, quis dapibus libero vehicula ut. Integer maximus urna vel risus rutrum finibus. Ut ullamcorper ac orci sed mattis. Ut egestas ante eget erat tincidunt sollicitudin.</p>

                        <p>Vivamus pellentesque dolor suscipit placerat ultrices. Donec semper tempor sodales. Suspendisse porttitor felis purus, sed accumsan nisl molestie ac. Donec nec enim tristique, aliquet odio vel, porttitor leo. Donec quis mollis leo. Ut convallis bibendum dolor, sit amet finibus nisl mattis non. Vestibulum vel turpis at eros ultricies pellentesque. Nullam convallis convallis erat. Cras congue nisl gravida pulvinar dapibus. Aenean id lobortis nulla. Sed vel risus neque. In id tempus nibh. Proin arcu sem, convallis vel vestibulum in, sodales et magna.</p>
                    </Column>
                </Row>
            </Column>
        </div>
        );
    }
}

export default HomePage;
