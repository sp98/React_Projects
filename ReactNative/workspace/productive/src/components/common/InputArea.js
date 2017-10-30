import React from 'react';
import { Text, View, TextInput } from 'react-native';

class InputArea extends React.Component {

// const { label, value, onChangeText, placeHolder, secureTextEntry } = this.props;
// const { inputStyle, containerStyle, labelStyle } = styles;

showLabel(label) {
  if (label) {
      return <Text style={styles.labelStyle}> {label}</Text>;
  }
}

render() {
  return (
    <View style={styles.containerStyle}>
     {this.showLabel(this.props.label)}
    <TextInput
     secureTextEntry={this.props.secureTextEntry}
     autoCorrect={false}
     placeholder={this.props.placeHolder}
     style={this.props.inputStyle}
     value={this.props.value}
     onChangeText={this.props.onChangeText}
    />
    </View>
  );
}

}

const styles = {
  inputStyle: {
   color: '#000',
   paddingRight: 2,
   paddingLeft: 2,
   fontSize: 18,
   lineHeight: 30,
   flex: 3
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    marginTop: 40
  }
};

export { InputArea };
