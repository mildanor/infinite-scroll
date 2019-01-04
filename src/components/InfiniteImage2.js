import React, {Fragment }from 'react';


//const timestamp = 1500348260;
//https://alligator.io/react/react-infinite-scroll/
class InfiniteImage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            windowHeight: window.innerHeight,
            image: '',
            images: [],
            timestamp: 1500348260,
            increaseInterval: 20
        };
        this.handleResize = this.handleResize.bind(this);
        window.onscroll = () => {
            const {
              loadUsers,
              state: {
                error,
                isLoading,
                hasMore,
              },
            } = this;
      
            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (error || isLoading || !hasMore) return;
      
            // Checks that the page has scrolled to the bottom
            if (
              window.innerHeight + document.documentElement.scrollTop
              === document.documentElement.offsetHeight
            ) {
              loadUsers();
            }
          };
        }
      
        /*
        componentWillMount() {
          // Loads some users on initial load
          this.loadUsers();
        }
        */

        handleResize(e) {
            this.setState({windowHeight: window.innerHeight});
          }
        
          componentDidMount() {
            window.addEventListener('resize', this.handleResize);
            this.loadUsers();
          }
        
          componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize);
          }
      
        loadUsers = () => {
        //calculate height of screen to know how much height should be filled in
        this.setState({ isLoading: true });
        var callTime = 6;
        //var callTime = Math.round(window.innerHeight / 300) +1;
        var timestamp = this.state.timestamp;
        var increaseInterval = this.state.increaseInterval;
        let imagesNow = [];
        //var images =[];
        for (let i = 0; i < callTime; i++) {
            //console.log(timestamp);
        fetch('https://hiring.verkada.com/thumbs/'+ timestamp + '.jpg')
            .then(response => response.blob())
           .then(images => {
            // Then create a local URL for that image and print it 
            var createImage = URL.createObjectURL(images);
            imagesNow.push(createImage);
            this.setState({
                images: imagesNow,
            })
            timestamp = timestamp + increaseInterval;
            this.setState({
                timestamp: timestamp,
            })
        })
    }   this.setState({
        // Note: Depending on the API you're using, this value may
        // be returned as part of the payload to indicate that there
        // is no additional data to be loaded
        hasMore: (this.state.images.length < 100),
        isLoading: false,
    }) 
}
      
        render() {
          const {
            error,
            hasMore,
            isLoading,
            images,
            timestamp
          } = this.state;
          console.log(timestamp);
          return (
            <div> 
            {images.map((img, i) => (
                <Fragment key={i}>
                <img
                src={img}
                style={{
                borderRadius: '50%',
                height: 500,
                marginRight: 20,
                width: 500,
                }}
                />
                <p>test {img} </p>
                </Fragment>
                ))}
              {error &&
                <div style={{ color: '#900' }}>
                  {error}
                </div>
              }
              {isLoading &&
                <div>Loading...</div>
              }
              {!hasMore &&
                <div>You did it! You reached the end!</div>
              }
            </div>
          );
        }
      }
      export default InfiniteImage;