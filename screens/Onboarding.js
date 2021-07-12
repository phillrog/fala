import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, View } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import LottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';
import { Video } from 'expo-av';

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: false,

    }).start();
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
          <Video
                source={require("../assets/videos/chicky.mp4")}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="stretch"
                shouldPlay
                isLooping
                style={{ width: '100%', height: '50%', position: 'absolute' }}
                /> 
        <StatusBar barStyle="light-content" />
        <Block flex  style={styles.imagem}>
          {/* <ImageBackground
            source={{  uri: Images.Onboarding }}
            style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
          /> */}

        <LottieView
            source={require("../assets/images/cool-chick.json")}
            autoPlay
            loop
            style={{height: 100}}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={60}>Fala</Text>
              </Block>
              <Block row>
                <Text color="white" size={60}>Sara Elisa</Text>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)'>
                v1.0
              </Text>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('App')}>
                PLAY
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'absolute',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  imagem: {    
    position: 'relative',
    marginTop: '90%',
    marginLeft: '60%',
    zIndex: 1,    

  },
  backgroundVideo: {
    height: height,
    width: width,
    
  },
});
