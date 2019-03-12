import React, {Fragment } from 'react';

//const imageHeight = 250;
const imageHeight = 240;
//const imageWidth = 250;
const imageWidth = 320;

const marginX = 10;
const marginY = 10

class InfiniteImageGrid extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          error: false,
          errorMessage: '',
          images: [],
          startTimestamp: 1500348260,
          endTimestamp: 1503031520,
          increaseInterval: 20,
          position: window.scrollY,
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.loadImagesBetweenIds = this.loadImagesBetweenIds.bind(this);
      }
      
       handleScroll(){
        this.setState({
          position: window.scrollY,
        })
        //console.log("Scrolled")

        let nRows = window.innerHeight / (imageHeight + marginY) 
        const nCols = 3
        let nStart = 3 * Math.floor(window.scrollY / (imageHeight + marginY))
        let nEnd = nStart + Math.floor(nRows * nCols) + 12
       // console.log("ScrollY = " + window.scrollY + " nStart = " + nStart + " nEnd = " + nEnd);
       this.loadImagesBetweenIds(nStart, nEnd)
        
    }
  
    loadImagesBetweenIds(startId, endId){
      this.setState({
        images: [],
      });
      let imagesNow = this.state.images;
       for(var i = startId; i<=endId; i++){
         // console.log("Loading id " + i);
          let url = ('https://hiring.verkada.com/thumbs/'+ this.getImageTimestampById(i) + '.jpg')
          let x = this.getImagePositionXById(i)
          let y = this.getImagePositionYById(i)
         // console.log("Image " + i + " at ("+x+","+y+")" )
          imagesNow.push([url, x, y]);
          this.setState({
            images: imagesNow,
          });
          if (this.getImageTimestampById(i)+this.state.increaseInterval > this.state.endTimestamp){
            //console.log('no more imgs');
            this.setState({
              errorMessage: 'No more images to load',
              error: true,
            })
            break
          }
      }
    }

      getImageTimestampById(image_id){
      let timetampById = this.state.startTimestamp + this.state.increaseInterval * image_id
      //console.log(timetampById)
      return timetampById
      }

     getImagePositionXById(image_id){
        let image_idx_rel_row = image_id % 3;
        return ((image_idx_rel_row + 1)*marginX + image_idx_rel_row*imageWidth)
      }

      getImagePositionYById(image_id){
        let nCurrentRow = Math.floor(image_id/3)
        return ((nCurrentRow)*imageHeight + (nCurrentRow+1)*marginY)
      }

      componentWillMount(){
        this.loadImagesBetweenIds(0,8);
      }

      componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
      
        render() {
          const {
            errorMessage,
            error,
            images,
            startTimestamp,
            endTimestamp,
            increaseInterval,
          } = this.state;
         const rows = Math.ceil((((endTimestamp - startTimestamp)/increaseInterval)+2)/3);
           return (
            <div style={{
              height: (rows * imageHeight + (rows+1)*marginY) ,
              position: 'absolute',
              textAlign: 'center',
              width: imageWidth * 3 + marginX * 6 + 'px'
              //the sum of margins + width
              }}> 
            {images.map((img, i) => (
                <Fragment key={i}>
                <img
                src={img[0]}
                alt={''}
                style={{
                height: imageHeight,
                marginLeft: marginX + 'px',
                marginRight: 10+'px',
                marginTop: 10,
                width: imageWidth,
                left: img[1],
                top: img[2],
                position: "absolute",
                }}
                />
                </Fragment>
                ))}
                {error ? 
                  <div style={{ 
                    color: 'white',
                    backgroundColor: '#900',
                    position: "absolute",
                    top: (rows * imageHeight + (rows+1)*marginY)+10+'px',
                    left: 47+'%',
                    padding: 10 + 'px',
                    margin: 1 +'%'
                 }}>
                    {errorMessage}
                  </div>
                :
                null
                } 
                </div>
          )
          }
        }
      export default InfiniteImageGrid;