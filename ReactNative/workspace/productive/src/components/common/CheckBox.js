import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

const CheckBox = (props) => {
 return (
   <TouchableHighlight onPress={props.onPress} >
   <View style={props.isPressed ? styles.checkboxPressed : styles.checkboxUnpressed}>
   <Text style={styles.checkboxStyles} />
   </View>
   </TouchableHighlight >
 );
};

const styles = {
  checkboxStyles: {
     borderTopWidth: 1,
     borderLeftWidth: 1,
     borderRightWidth: 1,
     borderBottomWidth: 1,
     height: 50,
     width: 50,
     position: 'relative'

  },

  checkboxPressed: {
    backgroundColor: 'green'
  },

  checkboxUnpressed: {
    backgroundColor: 'white'
  }
};

export { CheckBox };
