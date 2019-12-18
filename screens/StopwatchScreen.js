import { Notifications } from 'expo';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableHighlight, AppState, Alert } from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Stopwatch } from 'react-native-stopwatch-timer';
import registerForPushNotificationsAsync from '../registerForPushNotificationsAsync';
import { toggleStopwatch, resetStopwatch, addNotifTimes, notify } from '../modules/stopwatch';
import { onValueChange } from '../modules/timePicker';
import TimePicker from '../timePicker';
import { formatTimeString } from '../utils';

const Item = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

class NotifSettings extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.notifTimes.custom}
        renderItem={({ item }) => <Item title={item.time} />}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
};

class StopwatchScreen extends React.Component {
  render () {
    const {
      stopwatch: {
        notifTimes
      }
    } = this.props;
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MyStopwatch {...this.props} />
        <NotifSettings notifTimes={notifTimes} />
      </View>
    );
  }
};

class MyStopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.getMsecsTime = this.getMsecsTime.bind(this);
    this.TimePicker = React.createRef();
  };

  getMsecsTime(time) {
    this.props.stopwatch.notifTimes.custom.forEach(elem => {
      if (!elem.notified && elem.time <　time) {
        this.props.notify(elem.time);
        const title = 'ストップウォッチ';
        const body = `${formatTimeString(time)}が経過しました。`;
        if (AppState.currentState === 'active') {
          Alert.alert(title, body);
        } else {
          this.notifyTime(title, body);
        };
      };
    });
  };

  async notifyTime(title, body) {
    let token = await Notifications.getExpoPushTokenAsync();
console.log(token);
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'accept-encoding': 'gzip, deflate',
        'host': 'exp.host'
      },
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        priority: "high",
        sound: "default",
        channelId: "default",
      }),
    }).then((response) => response.json())
      .then((responseJson) => { })
      .catch((error) => { console.log(error) });
  };

  render() {
    const {
      stopwatch: {
        stopwatchStart,
        stopwatchReset,
      },
      timePicker: {
        selectedHour,
        selectedMinute,
        selectedSecond,
      },
      toggleStopwatch,
      resetStopwatch,
      addNotifTimes,
      onValueChange
    } = this.props;

    return (
        <View
          style={{
            flex: 1,
            marginTop: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Stopwatch
            laps
            msecs
            start={stopwatchStart}
            reset={stopwatchReset}
            options={options}
            getTime={this.getFormattedTime}
            getMsecs={this.getMsecsTime}
          />
          <TouchableHighlight
            onPress={() => this.TimePicker.current.open()}>
            <Text style={{ fontSize: 30 }}>途中通知</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={toggleStopwatch}>
            <Text style={{ fontSize: 30 }}>
              {stopwatchStart
                ? 'Start'
                : 'Stop'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={resetStopwatch}>
            <Text style={{ fontSize: 30 }}>Reset</Text>
          </TouchableHighlight>
          <TimePicker
            ref={this.TimePicker}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            selectedSecond={selectedSecond}
            addNotifTimes={addNotifTimes}
            onValueChange={onValueChange}
          />
        </View>
    );
  }
}

StopwatchScreen.navigationOptions = {
  title: 'Stopwatch',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  },
};

const mapStateToProps = state => {
  return {
    stopwatch: state.stopwatch,
    timePicker: state.timePicker
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleStopwatch,
      resetStopwatch,
      addNotifTimes,
      notify,
      onValueChange
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StopwatchScreen)
