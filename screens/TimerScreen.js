import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Timer } from 'react-native-stopwatch-timer';
import { toggleTimer, resetTimer } from '../modules/timer';
import TimePicker from '../timePicker';
import { formatTimeString } from '../utils';

class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getMsecsTime = this.getMsecsTime.bind(this);
  };

  getMsecsTime(time) {
    if (this.props.timer.notifTimes.includes(time)) {
      alert(`残り${formatTimeString(time)}です。`);
    };
  };

  render() {
    const {
      timer: {
        timerStart,
        totalDuration,
        timerReset
      },
      toggleTimer,
      resetTimer
    } = this.props;

    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flex: 1,
            marginTop: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Timer
            totalDuration={totalDuration}
            msecs
            start={timerStart}
            reset={timerReset}
            options={options}
            getTime={this.getFormattedTime}
            getMsecs={this.getMsecsTime}
          />
          <TouchableHighlight
            onPress={() => this.TimePicker.current.open()}>
            <Text style={{ fontSize: 30 }}>途中通知</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={toggleTimer}>
            <Text style={{ fontSize: 30 }}>
              {timerStart
                ? 'Start'
                : 'Stop'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={resetTimer}>
            <Text style={{ fontSize: 30 }}>Reset</Text>
          </TouchableHighlight>
        </View>
        <TimePicker ref={this.TimePicker} />
      </View>
    );
  }
}

TimerScreen.navigationOptions = {
  title: 'Timer',
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
    timer: state.timer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleTimer,
      resetTimer
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerScreen)
