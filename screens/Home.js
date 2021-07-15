import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet, Dimensions, ScrollView, 
} from "react-native";
import YoutubeIframe, { getYoutubeMeta } from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-community/async-storage";

import { Button, Block, Input, theme } from 'galio-framework';

import { Icon, Product } from '../components/';

const { width, height } = Dimensions.get('screen');
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import products from '../constants/products';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import YoutubePlayer from "react-native-youtube-iframe";

export default class Home extends React.Component {
 
  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate('Pro')}
      />
    )
  }
  
  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Categories</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Best Deals</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <Product product={products[0]} horizontal />
          <Block flex row>
            <Product product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Product product={products[2]} />
          </Block>
          <Product product={products[3]} horizontal />
          <Product product={products[4]} full />
        </Block>
      </ScrollView>
    )
  }



  render() {
    return (<Videos />)
  }

  loading(quantidade) {
    return Array.from({length: quantidade}, (v, k) => (
      <Block flex style={styles.skeleton}>
      <SkeletonPlaceholder key={'sk'+ v} >
        <SkeletonPlaceholder.Item key={'ski1'+ v} flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item key={'ski2'+ v} style={styles.skeletonItem} width={80} height={80} borderRadius={50} />
          <SkeletonPlaceholder.Item key={'ski3'+ v} style={styles.skeletonItem} marginLeft={20}>
            <SkeletonPlaceholder.Item  key={'ski4'+ v} width={170} height={20} borderRadius={4} />
            <SkeletonPlaceholder.Item key={'ski5'+ v}
              marginTop={6}
              width={80}
              height={20}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      </Block>
    ));
    
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  skeletons: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,    
  },
  skeleton: {
    padding: 30,
    
  },
  skeletonItem: {
    backgroundColor: 'red'    
  }

});

const videoSeries = [
  "Enum4wn9pp0",
  "Lwe3x5O3a1E",
  "iHD6e_vE9xQ",
  "CrRtbj-QARc",
];

const Videos = () => {
  const [modalVisible, showModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  let state = {
    loading: false,
  };

  const onVideoPress = useCallback((videoId) => {
    showModal(true);
    setSelectedVideo(videoId);
  }, []);

  useEffect(() => {
    getProgress().then((p) => {
      setProgress(p);
    });
  }, [modalVisible]);

  const closeModal = useCallback(() => showModal(false), []);

  // this.setState({ loading: true });
  
  return ( 
    
  //   this.state.loading ?
  //   <Block flex center style={styles.skeletons}>
  //      {
  //       this.loading(3)
  //      }

  // </Block>
  
  // :
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ margin: 16, paddingBottom: 16 }}
        ListHeaderComponent={
          <>
            <Text style={{ fontSize: 18, fontWeight: "800" }}>
              Escolha aqui Sara
            </Text>
            <ProgressBar progress={progress * 100} />
          </>
        }
        data={videoSeries}
        renderItem={({ item }) => (
          <VideoItem videoId={item} onPress={onVideoPress} />
        )}
        keyExtractor={(item) => item}
        onEndReachedThreshold={0.1}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <VideoModal videoId={selectedVideo} onClose={closeModal} />
      </Modal>
    </SafeAreaView>
  );
};

const getProgress = async () => {
  const total = videoSeries.length;
  let completed = 0;
  for (let i = 0; i < total; i++) {
    const videoId = videoSeries[i];
    const status = await getVideoProgress(videoId);
    if (status?.completed) {
      completed += 1;
    }
  }
  return completed / total;
};

const ProgressBar = ({ progress }) => {
  const width = (progress || 0) + "%";
  return (
    <View style={{ borderWidth: 1, marginVertical: 16 }}>
      <View
        style={{
          backgroundColor: "green",
          height: 10,
          width,
        }}
      />
    </View>
  );
};

const VideoItem = ({ videoId, onPress }) => {
  const [videoMeta, setVideoMeta] = useState(null);
  useEffect(() => {
    getYoutubeMeta(videoId).then((data) => {
      setVideoMeta(data);
    });
  }, [videoId]);

  if (videoMeta) {
    return (
      <TouchableOpacity
        onPress={() => onPress(videoId)}
        style={{ flexDirection: "row", marginVertical: 16 }}
      >
        <Image
          source={{ uri: videoMeta.thumbnail_url }}
          style={{
            width: videoMeta.thumbnail_width / 4,
            height: videoMeta.thumbnail_height / 4,
          }}
        />
        <View style={{ justifyContent: "center", marginStart: 16 }}>
          <Text style={{ marginVertical: 4, fontWeight: "bold" }}>
            {videoMeta.title}
          </Text>
          <Text>{videoMeta.author_name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return null;
};

const VideoModal = ({ videoId, onClose }) => {
  const playerRef = useRef(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      playerRef.current?.getCurrentTime().then((data) => {
        // saveVideoProgress({
        //   videoId,
        //   completed,
        //   timeStamp: data,
        // });
      });
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [videoId, completed]);

  const onPlayerReady = useCallback(() => {
    getVideoProgress(videoId).then((data) => {
      if (data.timeStamp) {
        playerRef.current?.seekTo(data.timeStamp);
      }
    });
  }, [videoId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000dd",
        justifyContent: "center",
        
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', height: SCREEN_WIDTH * 2 }}>
        <Text onPress={onClose} style={{ textAlign: "right", color: 'red' }}>
          <Icon name="close" family="font-awesome" size={48} />
        </Text>
        <YoutubeIframe
          ref={playerRef}
          play={true}
          videoId={videoId}
          height={250}
          width={SCREEN_WIDTH}
          onReady={onPlayerReady}
          onChangeState={(state) => {
            if (state === "ended") {
              setCompleted(true);
            }
          }}
          initialPlayerParams={{
            preventFullScreen: false,
            iv_load_policy: 3, 
            modestbranding: 1,
            rel: 0
          }}
          style={{zIndex: 1, position: 'absolute'}}
        />
      </View>
    </View>
  );
};

const saveVideoProgress = ({ videoId, completed, timeStamp }) => {
  const data = {
    completed,
    timeStamp,
  };

  return AsyncStorage.setItem(videoId, JSON.stringify(data));
};

const getVideoProgress = async (videoId) => {
  const json = await AsyncStorage.getItem(videoId);
  if (json) {
    return JSON.parse(json);
  }
  return {
    completed: false,
    timeStamp: 0,
  };
};