import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
  } from 'react-native';
  import * as Permissions from 'expo-permissions';
  import * as Contacts from 'expo-contacts'
  import React from 'react'
  
  
  
  export default class HomeScreen extends React.Component {
   
    _isMounted = false;
  
      constructor() {
      super();
      this.state = {
        isLoading: false,
        contacts: []
      };
    }
  
    loadContacts = async () => {
      const permission = await Permissions.askAsync(
        Permissions.CONTACTS
      );
  
      if (permission.status !== 'granted') {
        return;
      }
  
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
      });
  
      // console.log(data);
      this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
    };
  
    componentDidMount() {
      this._isMounted = true;
      this.setState({ isLoading: true });
      this.loadContacts();
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
  
    renderItem = ({ item }) => (
      <View style={{ minHeight: 70, padding: 5 }}>
        <Text style={{ color: '#40E0D0',  fontSize: 18 }}>
          {item.firstName + ' '}
          {item.lastName}
        </Text>
       
      </View>
    );
  
    searchContacts = value => {
      const filteredContacts = this.state.inMemoryContacts.filter(contact => {
        let contactLowercase = (
          contact.firstName +
          ' ' +
          contact.lastName
        ).toLowerCase();
        
        let searchTermLowercase = value.toLowerCase();
        return contactLowercase.indexOf(searchTermLowercase) > -1;
      });
      this.setState({ contacts: filteredContacts });
    };
  
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ backgroundColor: '#b3daff' }} />
         
          <View style={{backgroundColor: 'white' , flexDirection:"row" }}>
          <TouchableOpacity
                      style={styles.button}
                      >
                      <Text style={styles.buttonTitle}>Contacts</Text>
                  </TouchableOpacity>
          <TouchableOpacity
                      style={styles.button}
                      >
                      <Text style={styles.buttonTitle}>Profile</Text>
         </TouchableOpacity>
         <TouchableOpacity
                      style={styles.button}
                      >
                      <Text style={styles.buttonTitle}>Settings</Text>
                  </TouchableOpacity>
                  </View>
  
          <TextInput
            placeholder="Search for contacts..."
            placeholderTextColor="#dddddd"
            style={{
              backgroundColor: 'white',
              height: 50,
              fontSize: 16,
              padding: 10,
              color: 'black',
              borderBottomWidth: 0.5,
              borderBottomColor: '#7d90a0'
              
              
            }}
            onChangeText={value => this.searchContacts(value)}
          />
          <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {this.state.isLoading ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ActivityIndicator size="large" color="#40E0D0" />
              </View>
            ) : null}
            <FlatList
              data={this.state.contacts}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50
                  }}
                >
                  <Text style={{ color: '#40E0D0' }}>No Contacts Found</Text>
                </View>
              )}
            />
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#b3daff',
      alignItems: 'center',
      justifyContent: 'center',
    },
      button: {
        backgroundColor: '#40E0D0',
        marginLeft: 13,
        marginRight: 12,
        width: 100,
        marginTop: 0,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    }
  });
  