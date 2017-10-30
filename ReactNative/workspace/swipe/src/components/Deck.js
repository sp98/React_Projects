import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions } from 'react-native';

//getting the width of the screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      //Any time a user presses on a screen.
      //True means this pan responsder will be responsible for handling the gesture
     onStartShouldSetPanResponder: () => true,

     //Call back when the user drags fingers around the screen.
     //Event: What component the user is pressing or touching
     //Gesture: How the user is moving fingers on the screen.

     onPanResponderMove: (event, gesture) => {
       //manually updating the position of the element
       position.setValue({ x: gesture.dx, y: gesture.dy });
     },

     // call back when the user removes the fingers from the screen.
     onPanResponderRelease: (event, gesture) => {
       if (gesture.dx > SWIPE_THRESHOLD) {
         this.forceSwipe('right');
       } else if (gesture.dx < -SWIPE_THRESHOLD) {
        this.forceSwipe('left');
       } else {
         this.resetPosition();
       }
     }
    });

   this.state = { panResponder, position, index: 0 };
  }


    onSwipeComplete(direction) {
      const { onSwipeRight, onSwipeLeft, data } = this.props;
      const item = data[this.state.index];
      direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
      this.state.position.setValue({ x: 0, y: 0 });
      this.setState({ index: this.state.index + 1 });
    }

  getCardStyle() {
    const { position } = this.state;
    // get movement in x direction and assign it to rotate variable
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete());
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }


  renderCards() {
    // when no more cards are there:
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    //index: element we are working on.
    return this.props.data.map((item, i) => {
      // for the cards that have been swiped out.
      if (i < this.state.index) {
        return null;
      }

      // for the current card
      if (i === this.state.index) {
        return (
          <Animated.View
          key={item.id}
          style={[this.getCardStyle(), styles.cardStyle]}
          {...this.state.panResponder.panHandlers}
          >
          {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View key={item.id} style={styles.cardStyle}>>
        {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }
  render() {
    //Tying the panResponder to the view using ...
    return (
      <View>
      {this.renderCards()}
      </View>
    );
  }
}

const styles = {
   cardStyle: {
     positon: 'absolute',
     width: SCREEN_WIDTH
   }
};
export default Deck;
