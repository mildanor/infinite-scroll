import React, { Component, Fragment } from 'react';


//const timestamp = 1500348260;
//https://alligator.io/react/react-infinite-scroll/
class InfiniteImage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            image: ''
        };
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
      
        componentWillMount() {
          // Loads some users on initial load
          this.loadUsers();
        }
      
        loadUsers = () => {
        var outside 
          this.setState({ isLoading: true }, () => {
            fetch('https://hiring.verkada.com/thumbs/1500348260.jpg')
            .then(response => response.blob())
           .then(images => {
            // Then create a local URL for that image and print it 
            outside = URL.createObjectURL(images)
            console.log(outside)
            this.setState({
                image: outside
            })
  })
                // Creates a massaged array of user data
               // console.log(results);
                // Merges the next users into our existing users
                /*
                this.setState({
                  // Note: Depending on the API you're using, this value may
                  // be returned as part of the payload to indicate that there
                  // is no additional data to be loaded
                  hasMore: (this.state.image.length < 100),
                  isLoading: false,
                  image: results,
                });
              })

 */             .catch((err) => {
                this.setState({
                  error: err.message,
                  isLoading: false,
                 });
              })
          });
        }
      
        render() {
          const {
            error,
            hasMore,
            isLoading,
            image,
          } = this.state;
      
          return (
            <div>
              <h1>Infinite Users!</h1>
              <p>Scroll down to load more!!</p>
              <img 
                     src={image}
                      style={{
                        borderRadius: '50%',
                        height: 72,
                        marginRight: 20,
                        width: 72,
                      }}
                    />
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