import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Pedometer } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  static navigationOptions = {
    title: 'Gestern',
  };


  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>


        <View style = {{borderWidth:15, borderColor: '#cccccc', borderRadius:150, height:250, width:250,  alignSelf: 'center', marginTop: 20}}>
          <Text style={{alignSelf: 'center', fontSize: 50, color: '#666666', marginTop: 40}}>
            {this.state.pastStepCount * 2.5}
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 42, color: '#666666', marginTop: 40}}>
            Punkte
          </Text>

        </View>


        <View style={styles.tabBarInfoContainer}>
          <View style={{flex:1, flexDirection:'row'}}>
            <View>
              <Image
                source={require('../assets/images/manIcon.png')}
                style={styles.manIcon}
              />
            </View>
            <View>
              <Text style={{fontSize:16, fontWeight: 'bold', marginTop: 10}}>
                Schritte
              </Text>
              <Text>
                {this.state.pastStepCount}
              </Text>
            </View>
          </View>

          <View style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
            <Text style={{}}>
              {this.state.pastStepCount * 2.5}
            </Text>
            <Text style={{fontSize: 15}}>
              Punkte
            </Text>
          </View>
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fbfbfb',
    padding: 5,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  manIcon: {
    width:80,
    height:80,
    marginRight: 10
  }

});
