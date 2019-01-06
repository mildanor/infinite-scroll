import React from 'react';
import Image from './Image';

class InfiniteImage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
           // windowHeight: window.innerHeight,
            imagesPlaceholder: [],
            starTimestamp: 1500348260,
            endTimestamp: 1503031520,
            increaseInterval: 20
        };
        this.createGrid = this.createGrid.bind(this);
      }

      componentDidMount(){
        this.createGrid();
      }

      createGrid(){
        let imagesArray = this.state.imagesPlaceholder;
        //let timestamp = this.state.starTimestamp;
        for (let i = 1500348260; i <= 1500348320; i + 20) {
            imagesArray.push(i);
            this.setState({
              imagesPlaceholder: imagesArray,
            });
          }
          //timestamp = timestamp + 20;
      }


      
         render () {
         // console.log(timestamp);
         let {imagesPlaceholder} = this.state;
         console.log(imagesPlaceholder);
         return (
          <div> 
          
          {imagesPlaceholder.map((id) => 
            <Image key={id}  />      
         )
        }
    
          </div>
        );
          
        }
      }
      export default InfiniteImage;