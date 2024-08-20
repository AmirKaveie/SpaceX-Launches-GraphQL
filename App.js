// App.js

import React from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet } from "react-native";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "./ApolloClient";

const GET_LAUNCHES = gql`
  query GetLaunches {
    launchesPast(limit: 10) {
      id
      mission_name
      launch_date_utc
    }
  }
`;

const LaunchesList = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.launchesPast}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.mission_name}</Text>
          <Text style={styles.date}>{new Date(item.launch_date_utc).toDateString()}</Text>
        </View>
      )}
    />
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>SpaceX Launches</Text>
        <LaunchesList />
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});

export default App;