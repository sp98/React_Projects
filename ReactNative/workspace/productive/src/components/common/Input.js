import React from 'react';
import { Text, View, TextInput } from 'react-native';


class Input extends React.Component {

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
       style={styles.inputStyle}
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
   paddingRight: 5,
   paddingLeft: 5,
   fontSize: 18,
   lineHeight: 23,
   flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
};
export { Input };
