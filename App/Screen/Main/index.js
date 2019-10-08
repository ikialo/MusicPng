import React from 'react'
import { StyleSheet, Platform,TouchableOpacity, FlatList, Image, Text, View, Button } from 'react-native'

import auth, { firebase } from '@react-native-firebase/auth';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { SearchBar } from 'react-native-elements';
import database from '@react-native-firebase/database';




const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    name: 'i',

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    name: 'h',

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    name: 'f',

  },

  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba123',
    title: 'First Item',
    name: 'g',

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63232',
    title: 'Second Item',
    name: 'e',

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72121',
    title: 'Third Item',
    name: 'd',

  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bawerwe',
    title: 'First Item',
    name: 'c',

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63ewr',
    title: 'Second Item',
    name: 'b',

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72adf',
    title: 'Third Item',

    name: 'a',
  },
];

var list = [];

function onSnapShot(snapshot){


  snapshot.forEach(
    function (childSnapShot) {

      var song = childSnapShot.child("SongName").val();
      var url = childSnapShot.child("URL").val();


      list.push({
        id: childSnapShot,
        nameSong: song,
        songUrl: url

      })

     

    }
  )

  

}

function GetList(){

  const ref = database().ref('/Artists/{ArtistId}/Songs/');

  ref.on('value', onSnapShot);


}







function press(name) {

  console.warn(name);

}
function Item({ title, name }) {
  return (


    <TouchableOpacity
      style={styles.item}
      onPress={() => press(title)}>

      <View>

        <Text>{title}</Text>
        <Text>{name}</Text>


      </View>


    </TouchableOpacity>



  );
}

function second(i) {

  console.warn(i)


}









class Main extends React.Component {

  state = {
    currentUser: '',
    search: '',
  }
  componentDidMount() {


    firebase.auth().onAuthStateChanged(user => {

      if (user) {
        this.setState(
          {
            currentUser: user.displayName
          })

        GetList();
      }
      else {
        this.setState(
          {
            currentUser: ""
          })
      }

    })
  }

  signOut = () => {
    this.setState(
      {
        currentUser: ""
      })
    //firebase.auth().signOut();

    this.props.navigation.navigate("MusicPlayer");
  }
  updateSearch = search => {
    this.setState({ search });
  };


 

  render() {
    const { currentUser } = this.state

    const { search } = this.state;


    return (


      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <View style={styles.container}>

          <FlatList
            data={list}
            renderItem={({ item }) => <Item title={item.title}
              name={item.name}
            />}
            keyExtractor={item => item.id}
          />
          <Button title="Music Player" color="red" onPress={this.signOut} />

        </View>
      </View>

    )
  }
}

class Artist extends React.Component {

  state = { currentUser: '' }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {

      if (user) {
        this.setState(
          {
            currentUser: user.displayName
          })
      }
      else {
        this.setState(
          {
            currentUser: ""
          })
      }

    })
  }

  signOut = () => {
    this.setState(
      {
        currentUser: ""
      })
    firebase.auth().signOut();
  }


  render() {
    const { currentUser } = this.state



    return (
      <View style={styles.container}>
        <Text>
          Artist {currentUser}!
        </Text>
        <Button title="Sign Out" color="red" onPress={this.signOut} />

      </View>
    )
  }
}
const MainTabNav = createMaterialTopTabNavigator({
  Main: Main,
  Artist: Artist


})

const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default createAppContainer(MainTabNav);