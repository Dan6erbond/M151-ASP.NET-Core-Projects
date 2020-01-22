import * as React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Button} from "reactstrap";
import './Image.css';

const urls = [
    'http://i.imgur.com/kJXRAZH.jpg',
    'http://i.imgur.com/TaA1gj9.png',
    'https://i.imgur.com/lCjIaT0.jpg',
    'https://i.imgur.com/rnSyGHP.jpg',
    'https://i.imgur.com/suoWg.jpg',
    'https://i.imgur.com/MMPhWTT.jpg',
    'https://i.imgur.com/KRtISUD.jpg',
    'https://i.imgur.com/vBaN4CL.jpg'
];

const divStyle = {
    position: 'fixed' as 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0'
};

const imgStyle = {
    top: 0,
    zIndex: -1000,
    backgroundColor: '#FFFEF4',
    width: '100%',
    position: 'fixed' as 'fixed'
};

interface IProps {
}

interface IState {
    index: number;
}

export default class SlidingPages extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            index: 0
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(event: React.MouseEvent<any, MouseEvent>) {
        var index = this.state.index;
        index += 1;
        
        if (index >= urls.length) {
            index = 0;
        }

        this.setState({
            index: index
        })
    }

    render() {
        return (
            <div style={divStyle}>
                <Button onClick={this.onClick}>Change Image</Button>

                <TransitionGroup>
                    <CSSTransition key={this.state.index}
                                   classNames='background'
                                   timeout={{enter: 1000, exit: 1000}}>
                        <img src={urls[this.state.index]} style={imgStyle} alt="Image"/>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}