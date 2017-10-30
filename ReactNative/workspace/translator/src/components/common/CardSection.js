import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  //overriding the containerStyle
  // we are passing an array of styles
  // With arrays, the style on the right will overrirde the one on the left.
  return (
    <View style={[styles.containerStyle, props.style]}>
     {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
