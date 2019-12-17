import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Picker } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';
import { getMsecs } from './utils';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.RBSheet = React.createRef();
  }

  getHourItems = () => {
    const items = [];
    for (let i = 0; i <= 23; i++) {
      const item = <Picker.Item key={i} value={i} label={i + '時間'} />;
      items.push(item);
    }
    return items;
  };

  getMinuteItems = () => {
    const items = [];
    for (let i = 0; i <= 59; i++) {
      const value = i < 10 ? `0${i}` : `${i}`;
      const item = <Picker.Item key={i} value={value} label={value + '分'} />;
      items.push(item);
    }
    return items;
  };

  getSecondItems = () => {
    const items = [];
    for (let i = 0; i <= 59; i++) {
      const value = i < 10 ? `0${i}` : `${i}`;
      const item = <Picker.Item key={i} value={value} label={value + '秒'} />;
      items.push(item);
    }
    return items;
  };

  onCancel = () => {
    this.close();
  };

  onConfirm = (selectedHour, selectedMinute, selectedSecond, addNotifTimes) => {
    addNotifTimes(selectedHour, selectedMinute, selectedSecond);
    this.close();
  };

  close = () => {
    this.RBSheet.current.close();
  };

  open = () => {
    this.RBSheet.current.open();
  };

  renderHeader = () => {
    const {
      selectedHour,
      selectedMinute,
      selectedSecond,
      addNotifTimes
    } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.onCancel} style={styles.buttonAction}>
          <Text style={[styles.buttonText, styles.buttonTextCancel]}>
            キャンセル
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onConfirm(selectedHour, selectedMinute, selectedSecond, addNotifTimes)} style={styles.buttonAction}>
          <Text style={styles.buttonText}>完了</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderBody = () => {
    const {
      selectedHour,
      selectedMinute,
      selectedSecond,
      onValueChange
    } = this.props;
    return (
      <View style={styles.body}>
        <Picker
          selectedValue={selectedHour}
          style={styles.picker}
          onValueChange={itemValue =>
            onValueChange(itemValue, selectedMinute, selectedSecond)
          }>
          {this.getHourItems()}
        </Picker>
        <Text style={styles.separator}>:</Text>
        <Picker
          selectedValue={selectedMinute}
          style={styles.picker}
          onValueChange={itemValue =>
            onValueChange(selectedHour, itemValue, selectedSecond)
          }>
          {this.getMinuteItems()}
        </Picker>
        <Text style={styles.separator}>:</Text>
        <Picker
          selectedValue={selectedSecond}
          style={styles.picker}
          onValueChange={itemValue =>
            onValueChange(selectedHour, selectedMinute, itemValue)
          }>
          {this.getSecondItems()}
        </Picker>
      </View>
    );
  };

  render() {
    return (
      <RBSheet ref={this.RBSheet}>
        {this.renderHeader()}
        {this.renderBody()}
      </RBSheet>
    );
  }
}

export default TimePicker;
