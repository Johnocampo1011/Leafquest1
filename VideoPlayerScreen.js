import React, { useRef, useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

// Helper function to extract videoId
function getYoutubeId(url) {
  const regex = /(?:v=|\/)([a-zA-Z0-9_-]{11})(?:&|$)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function VideoPlayerScreen({ route, navigation }) {
  const playerRef = useRef();
  const { url, title, channel, suggestedVideos = [] } = route.params;
  const videoId = getYoutubeId(url);

  // **Filter out the currently playing video safely**
  const filteredVideos = suggestedVideos?.filter(v => v?.url && v.url !== url);

  // Custom header without text
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: { backgroundColor: '#2E481E' },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.videoPlaceholder}>
        <YoutubePlayer
          ref={playerRef}
          height={220}
          play={false}
          videoId={videoId}
        />
      </View>
    <ScrollView style={styles.container}>
      {/* Video Info */}
      <View style={styles.videoInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.channelName}>{channel}</Text>
      </View>

      {/* Suggested Videos */}
      {filteredVideos && filteredVideos.length > 0 && (
        <View style={styles.suggestedContainer}>
          <Text style={styles.sectionTitle}>Suggested Videos</Text>
          {filteredVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.suggestedVideoRow}
              onPress={() =>
                navigation.replace("VideoPlayerScreen", {
                  url: video.url,
                  title: video.title,
                  channel: video.channel,
                  suggestedVideos, // keep full list
                })
              }
            >
              <Image source={video.thumbnail} style={styles.suggestedThumbnail} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text numberOfLines={2} style={styles.suggestedTitle}>{video.title}</Text>
                <Text style={styles.suggestedChannel}>{video.channel}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d9efcbff' },
  videoPlaceholder: { height: 220, backgroundColor: "black", marginTop: 40, },
  videoInfo: { padding: 10 },
  title: { fontSize: 20, fontWeight: "bold", color: "black", marginBottom: 5 },
  channelName: { fontSize: 14, color: 'gray' },
  suggestedContainer: { padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  suggestedVideoRow: { flexDirection: 'row', marginBottom: 15, alignItems: 'center' },
  suggestedThumbnail: { width: 120, height: 70, borderRadius: 5 },
  suggestedTitle: { fontWeight: 'bold', fontSize: 14 },
  suggestedChannel: { fontSize: 12, color: 'gray', marginTop: 2 },
});