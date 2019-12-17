# Smart Stopwatch Development

## 要件

### Stopwatch

* 途中通知
  * RBSheetのTimePickerで時間を追加していける
  * 「何分ごと」で指定もできる
  * 二つの画面は下半分でnavigationできると良い(無理なら共存させる)

### Timer

* Timer機能
  * 上半分でTimePickerで時間の指定
  * startでカウントダウン表示に切り替わる
* 途中通知
  * RBSheetのTimePickerで時間を追加していける(残り時間で指定)

## TimePicker
https://github.com/nysamnang/react-native-24h-timepicker/blob/master/src/index.js を参考に実装

## 途中で知らせる時間等の表示
以下も参照
https://github.com/michaeljstevens/react-native-stopwatch-timer/blob/master/lib/utils.js

## selectedHour, ...とnotifTimesあたりのstate管理が面倒
→state管理libraryを入れる
