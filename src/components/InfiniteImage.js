import React, { Component, Fragment } from 'react';

//https://alligator.io/react/react-infinite-scroll/
class InfiniteImage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            users: []
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
          this.setState({ isLoading: true }, () => {
            fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
              .then((results) => {
                // Creates a massaged array of user data
                (console.log(results));
                const nextUsers = results.results.map(user => ({
                  email: user.email,
                  name: Object.values(user.name).join(' '),
                  photo: user.picture.medium,
                  username: user.login.username,
                  uuid: user.login.uuid,
                }));
      
                // Merges the next users into our existing users
                this.setState({
                  // Note: Depending on the API you're using, this value may
                  // be returned as part of the payload to indicate that there
                  // is no additional data to be loaded
                  hasMore: (this.state.users.length < 100),
                  isLoading: false,
                  users: [
                    ...this.state.users,
                    ...nextUsers,
                  ],
                });
              })
              .catch((err) => {
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
            users,
          } = this.state;
      
          return (
            <div>
              <h1>Infinite Users!</h1>
              <p>Scroll down to load more!!</p>
              {users.map(user => (
                <Fragment key={user.username}>
                  <hr />
                  <div style={{ display: 'flex' }}>
                    <img
                      alt={user.username}
                      src={user.photo}
                      style={{
                        borderRadius: '50%',
                        height: 72,
                        marginRight: 20,
                        width: 72,
                      }}
                    />
                    <div>
                      <h2 style={{ marginTop: 0 }}>
                        @{user.username}
                      </h2>
                      <p>Name: {user.name}</p>
                      <p>Email: {user.email}</p>
                    </div>
                  </div>
                </Fragment>
              ))}
              <hr />
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