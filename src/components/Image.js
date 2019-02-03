import React from 'react';
import { grey } from 'ansi-colors';
//import test from 'test.png'

//https://itnext.io/stable-image-component-with-placeholder-in-react-7c837b1ebee
class Image extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //img: 'uiuijijij',
            //key: this.props.id,
            loaded: false,
            //imgPosition: ''
        }
    }

    render (){
        //console.log(this.props.id)
        return(
            <div style={{
                height: 250,
                backgroundColor:grey,
                }}
                >
            </div> 
        )
    }
}

export default Image;
