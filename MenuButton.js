import React, { useLayoutEffect } from "react";
import { Alert, View, Text } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function MenuButton() {
  const navigation = useNavigation();

  return (
    <Menu>
      <MenuTrigger>
        <Ionicons name="menu" size={32} color="black" style={{ marginRight: 15 }} />
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: {
            marginTop: 35,               // position below trigger
            padding: 12,
            borderRadius: 12,
            width: 200,              // make menu wider
            alignItems: "center",    // center content
          },
          optionWrapper: {
                         // make each option bigger
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          },
          optionTouchable: {
            underlayColor: "green", // ✅ turns green when pressed
            activeOpacity: 70,
          },
        }}
      >
        <MenuOption onSelect={() => navigation.navigate("Profile")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="person" size={22} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 18 }}>Profile</Text>
          </View>
        </MenuOption>

        <MenuOption onSelect={() => Alert.alert("Logged out", "You have been logged out.")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="log-out" size={22} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 18 }}>Logout</Text>
          </View>
        </MenuOption>

        <MenuOption onSelect={() => Alert.alert("Settings clicked")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="settings" size={22} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 18 }}>Settings</Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

export function MenuHeaderScreen({ navigation, children }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <MenuButton />,
      headerShown: true,
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}>{children}</View>;
}
