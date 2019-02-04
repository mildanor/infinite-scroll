import React, {Fragment } from 'react';


//const timestamp = 1500348260;
//https://alligator.io/react/react-infinite-scroll/

const imageHeight = 250;
const imageWidth = 250;
const marginX = 20;
const marginY = 10

class InfiniteImage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: '',
            hasMore: true,
            //isLoading: false,
            images: [],
            startTimestamp: 1500348260,
            endTimestamp: 1503031520,
            increaseInterval: 20,
            position: window.scrollY,
           scrolling: false,
           message: ''
        };
       // this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.loadImagesBetweenIds = this.loadImagesBetweenIds.bind(this);
      }
      
       handleScroll(){
        this.setState({
          position: window.scrollY,
          scrolling: true,
        })
        console.log("Scrolled")

        var nRows = window.innerHeight / (imageHeight + marginY) 
        var nCols = 3
        var nStart = 3 * Math.floor(window.scrollY / (imageHeight + marginY))
        var nEnd = nStart + Math.floor(nRows * nCols) + 1
        console.log("ScrollY = " + window.scrollY + " nStart = " + nStart + " nEnd = " + nEnd);

        // Now, knowing the nStart and nEnd, load the relevant images. We'll worry about 
        // removing other later
       this.loadImagesBetweenIds(nStart, nEnd)
        
    }
  
    loadImagesBetweenIds(startId, endId){
      var timestamp = this.state.startTimestamp;
      var increaseInterval = this.state.increaseInterval;
      let imagesNow = this.state.images = [];
       for(var i = startId; i<=endId; i++){
          console.log("Loading id " + i);
          var url = ('https://hiring.verkada.com/thumbs/'+ this.getImageTimestampById(i) + '.jpg')
          var x = this.getImagePositionXById(i)
          var y = this.getImagePositionYById(i)
          console.log("Image " + i + " at ("+x+","+y+")" )
          imagesNow.push([url, x, y]);
          this.setState({
            images: imagesNow,
          });
          if (this.getImageTimestampById(i)+20 > this.state.endTimestamp){
            console.log('no more imgs');
            
            this.setState({
              error: 'No more images to load',
             // message: ,
            })
            break
          }
      }
    }

      getImageTimestampById(image_id){
      var timetampById = this.state.startTimestamp + 20 * image_id
      console.log(timetampById)
      return timetampById
      }

     getImagePositionXById(image_id){
        var image_idx_rel_row = image_id % 3;
        return ((image_idx_rel_row + 1)*marginX + image_idx_rel_row*imageWidth)
      }

      getImagePositionYById(image_id){
        var nCurrentRow = Math.floor(image_id/3)
        return ((nCurrentRow)*imageHeight + (nCurrentRow+1)*marginY)
      }

      componentWillMount(){
        this.loadImagesBetweenIds(0,8);
        //this.forceUpdate();
      }

      componentDidMount() {
        console.log("Component did mount")
        //this.loadUsers();
        window.addEventListener('scroll', this.handleScroll);
        
    }
    
    componentWillUnmount() {
       console.log("Component did unmount")
        window.removeEventListener('scroll', this.handleScroll);
    }
      
        render() {
          console.log("Render is called")
          const {
            error,
            //isLoading,
            images,
           startTimestamp,
           endTimestamp,
            //position
          } = this.state;
         //console.log(window.scrollY);
         const rows = Math.ceil((((endTimestamp - startTimestamp)/20)+2)/3);
         //console.log(rows);
          return (
            <div style={{
              height: (rows * 250 + (rows+1)*marginY) ,
              }}> 
            {images.map((img, i) => (
                <Fragment key={i}>
                <img
                src={img[0]}
                style={{
                height: imageHeight,
                marginLeft: 20+'%',
                marginRight: 10+'%',
                marginTop: 10,
                width: 250,
                left: img[1],
                top: img[2],
                position: "absolute",// Added for the very very hackish solution
                }}
                />
                </Fragment>
                ))}
             
                <div style={{ 
                  color: 'white',
                  backgroundColor: '#900',
                  position: "absolute",
                  top: (rows * 250 + (rows+1)*marginY)+'px',
                  left: 30+'px',
                  height: 30 + 'px'
               }}>
                  {error}
                </div>
            </div>
          );
        }
      }
      export default InfiniteImage;