import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function VideoScreen({ navigation }) {
   const [searchQuery, setSearchQuery] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Plant Videos',
      headerStyle: { backgroundColor: '#2E481E' },
      headerTintColor: '#fff',
      fontFamily: 'monospace',
      headerTitleStyle: {
        fontFamily: 'monospace',
        fontSize: 22,
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const videos = [
    {
      id: "1",
      url: "https://www.youtube.com/watch?v=V_KnIqwkozQ",
      title: "Propagating ZZ Plants: Soil Cuttings & Division (The Reliable Ways)",
      channel: "Leaf It To Me",
      thumbnail: { uri: "https://img.youtube.com/vi/V_KnIqwkozQ/hqdefault.jpg" },
      length: "4:04",
    },
    {
      id: "2",
      url: "https://www.youtube.com/watch?v=ySZv9-2Bzk4",
      title: "How to Grow the Perfect ZZ Plant | A Complete Care Guide for Beginners",
      channel: "Leaf It To Me",
      thumbnail: { uri: "https://img.youtube.com/vi/ySZv9-2Bzk4/hqdefault.jpg" },
      length: "5:24",
    },
    {
      id: "3",
      url: "https://www.youtube.com/watch?v=tYpW4Zn123k",
      title: "Common Snake Plant Problems (And How to Fix Them!)",
      channel: "Leaf It To Me",
      thumbnail: { uri: "https://img.youtube.com/vi/tYpW4Zn123k/hqdefault.jpg" },
      length: "3:10",
    },
     {
      id: "4",
      url: "https://www.youtube.com/watch?v=BM1iKp-rr0o",
      title: "The Ultimate Pothos Care Guide (From Surviving to Thriving!)",
      channel: "Leaf It To Me",
      thumbnail: { uri: "https://img.youtube.com/vi/BM1iKp-rr0o/hqdefault.jpg" },
      length: "4:06",
    },
    {
      id: "5",
      url: "https://www.youtube.com/watch?v=K4F9Om4_GTE",
      title: "How to Save a Dying Snake Plant (Step-by-Step Root Rot Rescue)",
      channel: "Leaf It To Me",
      thumbnail: { uri: "https://img.youtube.com/vi/K4F9Om4_GTE/hqdefault.jpg" },
      length: "4:10",
    },
    {
      id: "6",
      url: "https://www.youtube.com/watch?v=dw9Q9lfPWbw",
      title: "How to Propagate Snake Plants (3 Easy Ways to Get FREE Plants!)",
      channel: "Leaf It To Me",
      thumbnail: { uri: "https://img.youtube.com/vi/dw9Q9lfPWbw/hqdefault.jpg" },
      length: "5:54",
    },
    {
      id: "7",
      url: "https://www.youtube.com/watch?v=cA6TRRnTAfQ",
      title: "How to water propagate a Monstera Deliciosa",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/cA6TRRnTAfQ/hqdefault.jpg" },
      length: "7:50",
    },
     {
      id: "8",
      url: "https://www.youtube.com/watch?v=tqAo88gHNw4",
      title: "Why you need to cut your monstera",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/tqAo88gHNw4/hqdefault.jpg" },
      length: "5:17",
    },
    {
      id: "9",
      url: "https://www.youtube.com/watch?v=EQvlLyYpX5w",
      title: "How to grow a better plant",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/EQvlLyYpX5w/hqdefault.jpg" },
      length: "5:17",
    },
    {
      id: "10",
      url: "https://www.youtube.com/watch?v=ANPSnqKozyY",
      title: "4 signs your Monstera needs MORE sun",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/ANPSnqKozyY/hqdefault.jpg" },
      length: "5:46",
    },
    {
      id: "11",
      url: "https://www.youtube.com/watch?v=pDoBeaqXMQg",
      title: "How to grow the BEST Monstera",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/pDoBeaqXMQg/hqdefault.jpg" },
      length: "5:46",
    },
    {
      id: "12",
      url: "https://www.youtube.com/watch?v=zFKYJg-eXnw",
      title: "Multiply your Pothos 2x FASTER with this method",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/zFKYJg-eXnw/hqdefault.jpg" },
      length: "6:15",
    },
    {
      id: "13",
      url: "https://www.youtube.com/watch?v=5oMTKX1vIs0",
      title: "How to grow a better looking Monstera",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/5oMTKX1vIs0/hqdefault.jpg" },
      length: "8:23",
    },
    {
      id: "14",
      url: "https://www.youtube.com/watch?v=IMADtu8VRf0",
      title: "This is a better way to propagate your Monstera",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/IMADtu8VRf0/hqdefault.jpg" },
      length: "4:13",
    },
     {
      id: "15",
      url: "https://www.youtube.com/watch?v=nZhUOFdyb-8",
      title: "3 SIMPLE changes for the best Monstera",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/nZhUOFdyb-8/hqdefault.jpg" },
      length: "11:43",
    },
     {
      id: "16",
      url: "https://www.youtube.com/watch?v=WKKcgxR80oA",
      title: "Separate your Monstera roots like this!",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/WKKcgxR80oA/hqdefault.jpg" },
      length: "9:12",
    },
    {
      id: "17",
      url: "https://www.youtube.com/watch?v=H5l-Nbe5Fqs",
      title: "Stop picking the wrong pot size for your Monstera",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/H5l-Nbe5Fqs/hqdefault.jpg" },
      length: "11:13",
    },
     {
      id: "18",
      url: "https://www.youtube.com/watch?v=PUjftM56ghs",
      title: "The SECRET to get rid of plant pests",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/PUjftM56ghs/hqdefault.jpg" },
      length: "4:09",
    },
    {
      id: "19",
      url: "https://www.youtube.com/watch?v=tYQfZtD1Csc",
      title: "How to set up your Monstera for success",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/tYQfZtD1Csc/hqdefault.jpg" },
      length: "3:57",
    },
    {
      id: "20",
      url: "https://www.youtube.com/watch?v=RD7y59grK3U",
      title: "No, you cant just keep repotting your Monstera",
      channel: "Kill This Plant",
      thumbnail: { uri: "https://img.youtube.com/vi/RD7y59grK3U/hqdefault.jpg" },
      length: "6:42",
    },
    {
      id: "21",
      url: "https://www.youtube.com/watch?v=oTEUxYFOzr8",
      title: "How To Propagate a Pothos (The Easy Way)",
      channel: "Iron Sharpens Iron",
      thumbnail: { uri: "https://img.youtube.com/vi/oTEUxYFOzr8/hqdefault.jpg" },
      length: "5:58",
    },
    {
      id: "22",
      url: "https://www.youtube.com/watch?v=nyECKjZTd1E&list=PL3GhPVrsFIhZXGW7TE703oVWkL9DSn9j8&index=4",
      title: "The Ultimate Snake Plant Care Guide (Sansevieria)",
      channel: "Leaf It To Me",
      thumbnail: { uri: "https://img.youtube.com/vi/nyECKjZTd1E&list=PL3GhPVrsFIhZXGW7TE703oVWkL9DSn9j8&index=4/hqdefault.jpg" },
      length: "5:58",
    },
    {
      id: "23",
      url: "https://youtu.be/ZvMN6wTnZWs",
      title: "Conquering Low Light: Top Houseplants and Care",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/ZvMN6wTnZWs/hqdefault.jpg" },
      length: "5:20",
    },
    {
      id: "24",
      url: "https://youtu.be/hY9IbjtsbPQ",
      title: "Easy Indoor Plants Guide",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/hY9IbjtsbPQ/hqdefault.jpg" },
      length: "6:33",
    },
    {
      id: "25",
      url: "https://youtu.be/oVz0L9ksWYk",
      title: "Plant Killer to Plant Parent",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/oVz0L9ksWYk/hqdefault.jpg" },
      length: "6:07",
    },
    {
      id: "26",
      url: "https://www.youtube.com/watch?v=l79q9OSWJfQ",
      title: "Power of a Single Snap",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/l79q9OSWJfQ/hqdefault.jpg" },
      length: "3:52",
    },
    {
      id: "27",
      url: "https://youtu.be/7NAXmqzvkA4",
      title: "How to Water Your Houseplants",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/7NAXmqzvkA4/hqdefault.jpg" },
      length: "5:40",
    },
    {
      id: "28",
      url: "https://youtu.be/Cxd0jPE95vU",
      title: "Why Leaves Turn Yellow?",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/Cxd0jPE95vU/hqdefault.jpg" },
      length: "4:21",
    },
    {
      id: "29",
      url: "https://youtu.be/VrVvmQ18tZw",
      title: "How To Display Indoor Plants",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/VrVvmQ18tZw/hqdefault.jpg" },
      length: "5:24",
    },
    {
      id: "30",
      url: "https://youtu.be/WkauLZsGOS8",
      title: "Manila's Plant Nurseries",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/WkauLZsGOS8/hqdefault.jpg" },
      length: "5:17",
    },
    {
      id: "31",
      url: "https://www.youtube.com/watch?v=F5fnuQ0r5C8&t=14s",
      title: "Overwatering vs Underwatering",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/F5fnuQ0r5C8&t=14s/hqdefault.jpg" },
      length: "7:23",
    },
    {
      id: "32",
      url: "https://www.youtube.com/watch?v=YgdYIcxtRk0&t=9s",
      title: "Creating a Pet Safe Paradise",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/YgdYIcxtRk0&t=9s/hqdefault.jpg" },
      length: "6:53",
    },
    {
      id: "33",
      url: "https://youtu.be/Q4CP9cMNRfA",
      title: "The Healthier Houseplant Secret",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/Q4CP9cMNRfA/hqdefault.jpg" },
      length: "4:35",
    },
    {
      id: "34",
      url: "https://youtu.be/pFkiVo-WzsQ",
      title: "Cookies & Fertilizer",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/pFkiVo-WzsQ/hqdefault.jpg" },
      length: "5:54",
    },
    {
      id: "35",
      url: "https://youtu.be/o_tt8LdNGZ0",
      title: "Feeding Your Friends",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/o_tt8LdNGZ0/hqdefault.jpg" },
      length: "6:22",
    },
    {
      id: "36",
      url: "https://youtu.be/lwyg7y8EDbA",
      title: "How to Repot Your Houseplant",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/lwyg7y8EDbA/hqdefault.jpg" },
      length: "4:44",
    },
    {
      id: "37",
      url: "https://youtu.be/6uyHVKRHzlE",
      title: "Surviving the Storm",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/6uyHVKRHzlE/hqdefault.jpg" },
      length: "6:13",
    },
    {
      id: "38",
      url: "https://youtu.be/goMjhhTC_t0",
      title: "Rain or Shine  PH Gardening",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/goMjhhTC_t0/hqdefault.jpg" },
      length: "7:27",
    },
    {
      id: "39",
      url: "https://youtu.be/4VrHG8TxeIM",
      title: "Rainy Season Plants",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/4VrHG8TxeIM/hqdefault.jpg" },
      length: "4:54",
    },
    {
      id: "40",
      url: "https://youtu.be/-pMGMytLCFU",
      title: "From Concrete to Green Oasis",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/-pMGMytLCFU/hqdefault.jpg" },
      length: "5:54",
    },
    {
      id: "41",
      url: "https://youtu.be/qDQcYBo8i10",
      title: "Why Your Snake Plant Droops",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/qDQcYBo8i10/hqdefault.jpg" },
      length: "6:00",
    },
    {
      id: "42",
      url: "https://youtu.be/eeKPFd9GN_U",
      title: "Snake Plants & Your Dog",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/eeKPFd9GN_U/hqdefault.jpg" },
      length: "5:10",
    },
    {
      id: "43",
      url: "https://youtu.be/aed_s7CK9Qk",
      title: "The Green Air Conditioner",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/aed_s7CK9Qk/hqdefault.jpg" },
      length: "6:05",
    },
    {
      id: "44",
      url: "https://youtu.be/YArykoQ9cyU",
      title: "Mastering Snake Plant Water",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/YArykoQ9cyU/hqdefault.jpg" },
      length: "6:46",
    },
    {
      id: "45",
      url: "https://youtu.be/_dPXMLTsyRM",
      title: "The Moonshine Snake Plant",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/_dPXMLTsyRM/hqdefault.jpg" },
      length: "5:28",
    },
    {
      id: "46",
      url: "https://youtu.be/DazMuQFJ7iQ",
      title: "The Unlikely Hero in Your Home",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/DazMuQFJ7iQ/hqdefault.jpg" },
      length: "5:16",
    },
    {
      id: "47",
      url: "https://youtu.be/cHuK3X0wwSs",
      title: "The  Indestructible  Plant",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/cHuK3X0wwSs/hqdefault.jpg" },
      length: "6:50 ",
    },
    {
      id: "48",
      url: "https://youtu.be/B8juXgK_mj8",
      title: "Secret to Snake Plant Soil",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/B8juXgK_mj8/hqdefault.jpg" },
      length: "6:50 ",
    },
    {
      id: "49",
      url: "https://youtu.be/-FA8QA3GMHk",
      title: "Guide to Snake Plants",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/-FA8QA3GMHk/hqdefault.jpg" },
      length: "6:42 ",
    },
    {
      id: "50",
      url: "https://youtu.be/WsxcjBBs8r0",
      title: "How to Propagate ZZ Plants",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/WsxcjBBs8r0/hqdefault.jpg" },
      length: "5:57 ",
    },
    {
      id: "51",
      url: "https://youtu.be/gRlvOsdIats",
      title: "Your Guide to the ZZ Plant",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/gRlvOsdIats/hqdefault.jpg" },
      length: "5:05 ",
    },
    {
      id: "52",
      url: "https://youtu.be/OQZIDr9INWY",
      title: "Snake Plant vs ZZ Plant",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/OQZIDr9INWY/hqdefault.jpg" },
      length: "5:33",
    },
    {
      id: "53",
      url: "https://youtu.be/R5NrWg9L_kM",
      title: "Houseplants vs. Pollution",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/R5NrWg9L_kM/hqdefault.jpg" },
      length: "4:59",
    },
    {
      id: "54",
      url: "https://youtu.be/8Z2Jgsia60Y",
      title: "The Green Thumb Myth",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/8Z2Jgsia60Y/hqdefault.jpg" },
      length: "5:44",
    },
    {
      id: "55",
      url: "https://youtu.be/AkhIWqPSdxI",
      title: "Manila s Plant Guide",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/AkhIWqPSdxI/hqdefault.jpg" },
      length: "6:29",
    },
    {
      id: "56",
      url: "https://youtu.be/HAHhUxJ7Sw4",
      title: "ZZ Plant  Ultimate Survivor",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/HAHhUxJ7Sw4/hqdefault.jpg" },
      length: "6:31",
    },
    {
      id: "57",
      url: "https://youtu.be/PJ3rh-8ucc4",
      title: "The ZZ Plant  Survivor s Guide",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/PJ3rh-8ucc4/hqdefault.jpg" },
      length: "6:33",
    },
    {
      id: "58",
      url: "https://youtu.be/mEL2tcFqKCk",
      title: "The Unkillable ZZ Plant",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/mEL2tcFqKCk/hqdefault.jpg" },
      length: "5:14",
    },
    {
      id: "59",
      url: "https://youtu.be/uepA9p-C1a8",
      title: "Five Unkillable Plants",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/uepA9p-C1a8/hqdefault.jpg" },
      length: "6:46",
    },
    {
      id: "60",
      url: "https://youtu.be/CGSHEJIUpw4",
      title: "9 Ways to Style Your Pothos",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/CGSHEJIUpw4/hqdefault.jpg" },
      length: "6:05",
    },
    {
      id: "61",
      url: "https://youtu.be/oqJ1feqfuxI",
      title: "The Ultimate Pothos Guide",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/oqJ1feqfuxI/hqdefault.jpg" },
      length: "6:16",
    },
    {
      id: "62",
      url: "https://youtu.be/8wSA9ytPkHM",
      title: "The Ultimate Beginner's Plant",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/8wSA9ytPkHM/hqdefault.jpg" },
      length: "5:28",
    },
    {
      id: "63",
      url: "https://youtu.be/YpnyzgHNqG4",
      title: "How to Perfectly Water a Pothos",
      channel: "LeafQuest",
      thumbnail: { uri: "https://img.youtube.com/vi/YpnyzgHNqG4/hqdefault.jpg" },
      length: "5:49",
    },
  ];

   const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
    <View style={styles.container}>
      {/* Custom Header with Search */}
      <View style={styles.header}>
        <Ionicons name="search" size={20} color="#fff" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search videos..."
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* Video Feed */}
      <ScrollView>
        {filteredVideos.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.videoCard}
            onPress={() =>
              navigation.navigate("VideoPlayerScreen", {
                url: item.url,
                title: item.title,
                channel: item.channel,
                suggestedVideos: videos,
              })
            }
          >
            <Image source={item.thumbnail} style={styles.thumbnail} />
            <View style={styles.lengthTag}>
              <Text style={styles.lengthText}>{item.length}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={2} style={styles.title}>
                  {item.title}
                </Text>
                <Text style={styles.subText}>{item.channel}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredVideos.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
            No videos found
          </Text>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d9efcbff' },
  header: {
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:  '#2E481E',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#d9efcbff',
    borderRadius: 20,
    marginRight: 8,
  },
  tabActive: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#2E481E',
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: { color: 'black' },
  tabTextActive: { color: 'white', fontWeight: 'bold' },
  videoCard: { marginBottom: 15 },
  thumbnail: { width: '100%', height: 200 },
  lengthTag: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'black',
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  lengthText: { color: '#fff', fontSize: 12 },
  infoRow: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
  },
  searchBar: {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 20,
  paddingHorizontal: 15,
  height: 35,
  color: '#000',
},
title: { fontWeight: 'bold', fontSize: 14 },
  subText: { fontSize: 12, color: '#555' },
});
