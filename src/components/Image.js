import React from 'react';
//import test from 'test.png'

//https://itnext.io/stable-image-component-with-placeholder-in-react-7c837b1ebee
class Image extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            img: 'uiuijijij',
            key: this.props.id,
            loaded: false
        }
    }

    render (){
        //console.log(this.props.id)
        return(
            <div>
            <img
            //key={this.state.id}
            src={this.state.img}
            style={{
                height: 250,
                width: 250,
                }}
                />
                <p>{this.state.id}</p> 
            </div> 
        )
    }
}

export default Image;
