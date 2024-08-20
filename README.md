    ApolloClient.js: Configures the Apollo Client to interact with the SpaceX GraphQL API.
    
    App.js:
        Uses ApolloProvider to make the Apollo Client available throughout the app.
        Fetches the last 10 SpaceX launches using the useQuery hook and the GET_LAUNCHES GraphQL query.
        Displays the data in a list format using FlatList.
