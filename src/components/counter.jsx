import React, { Component } from 'react';
class Counter extends Component {
    state = {
        count: 0,
        tags:['tag1','tag2','tag3']
    };
    constructor(){
        super();
        this.incrementCount = this.incrementCount.bind(this);
    }
    render() {
        console.log(this.formatcount())
        return (
            
            <React.Fragment>
                <button className="btn btn-primary btn-sm m-2"></button>
                <span className=''>{this.formatcount()}</span>
                <button className='btn btn-secondary btn-sm' onClick={this.incrementCount
                }>Increment</button>
                < ul>
                    {this.state.tags.map(tag=><li>{ tag }</li>)}
                </ul>
            </React.Fragment>
        );
    }
    formatcount() {
        const { count } = this.state;
        return count === 0 ? "Zero" : count;
    }

    incrementCount = () => {
        this.setState({count: this.state.count+1});
    };
}


export default Counter;