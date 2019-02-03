import React from 'react';
import Image from './Image';
import Square from './Square';

class InfiniteImage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
           // windowHeight: window.innerHeight,
            imagesPlaceholder: [],
            //starTimestamp: 1500348260,
            starTimestamp: 8260,
            endTimestamp: 8520,
            //endTimestamp: 1503031520,
            increaseInterval: 20,
            windowViewportHeight: window.innerHeight,
            position: window.scrollY,
            scrolling: false,
        };
       // this.createGrid = this.createGrid.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
      }
/*
      handleScroll(event) {
        if (window.scrollY === 0 && this.state.scrolling === true) {
            this.setState({scrolling: false});
        }
        else if (window.scrollY !== 0 && this.state.scrolling !== true) {
            this.setState({scrolling: true});
        }
        console.log(this.state.scrolling);
    }

    getImages(){
      if (window.scrollY === 0){

      }
    }
    */
      
      handleScroll(){
        this.setState({
          position: window.scrollY,
          scrolling: true,
        })

        console.log(this.state.position);
      }
      

      componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
/*
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
      */


      
         render () {
         //  console.log(this.state.position);
          // console.log(this.state.windowViewportHeight);
         // console.log(timestamp);
        // let {imagesPlaceholder} = this.state;
        // console.log(imagesPlaceholder);
         return (
          <div
          style={{
            height: ((this.state.endTimestamp - this.state.starTimestamp) / this.state.increaseInterval)*250,
            }}
          > 
          <Square/>
          <Square/>
          <Square/>
          </div>
        );
          
        }
      }
      export default InfiniteImage;