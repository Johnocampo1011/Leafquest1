import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation }                from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { Homescreen } from './Homescreen';


// welcomeLeafQuest
export function Message() {
    const navigation = useNavigation();
    return (

        
        <View style={styles.container}>

    <ImageBackground
                style={styles.imagebg}
                source={require('./assets/Ellipse 5.png')}
                resizeMode="cover"
    ></ImageBackground>

    <Text style={styles.title}>WELCOME TO LEAFQUEST!</Text>

    <Text style={styles.body}>
        vitae nulla. Praesent libero arcu, pharetra a eget felis id, faucibus dui. Fusce at purus eu diam pellentesque malesuada. Donec varius diam sed quam.
    </Text>

    <Text style={styles.body}>
        massa libero. Sed malesuada volutpat eros vitae laoreet. In pretium. Aliquam quis vitae laoreet quis accumsan id nisi. Sed eleifend enim, eget felis fringilla.
    </Text>

    <Text style={styles.body}>
        nunc est, sem vel leo. Nam malesuada, ipsum id venenatis feugiat, non vitae lorem. Donec eu molestie nulla.
    </Text>

    <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Message1')}>
        <Text style={styles.buttonText}>CONTINUE</Text>
    </TouchableOpacity>
    </View>
);
}

const Stack = createNativeStackNavigator();

// whyLeafQuest

export function Message1({navigation}) {

    return (
        <View style={styles.container}>

    <ImageBackground
                style={styles.imagebg}
                source={require('./assets/Ellipse 5.png')}
                resizeMode="cover"
    ></ImageBackground>

    <Text style={styles.title2}>WHY  LEAFQUEST!</Text>

    <Text style={styles.body2}>
        vitae nulla. Praesent libero arcu, pharetra a eget felis id, faucibus dui. Fusce at purus eu diam pellentesque malesuada. Donec varius diam sed quam.
    </Text>

    <Text style={styles.body2}>
        massa libero. Sed malesuada volutpat eros vitae laoreet. In pretium. Aliquam quis vitae laoreet quis accumsan id nisi. Sed eleifend enim, eget felis fringilla.
    </Text>

    <Text style={styles.body2}>
        nunc est, sem vel leo. Nam malesuada, ipsum id venenatis feugiat, non vitae lorem. Donec eu molestie nulla.
    </Text>

    <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Homescreen')}>
        <Text style={styles.buttonText}>CONTINUE</Text>
    </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#E5E5E5',       
    paddingHorizontal: 40,
    paddingVertical: 100,
    justifyContent: 'center',
    textAlign: 'justify',
},
title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#2C5D1E',            
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 50,
},
body: {
    fontSize: 15,
    color: 'Black',                
    lineHeight: 20,
    marginBottom: 25, 
    textAlign: 'justify',
},
button: {
    backgroundColor: '#2C5D1E',       
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
},
title2: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#2C5D1E',            
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 80,
},
body2: {
    fontSize: 15,
    color: 'Black',                
    lineHeight: 20,
    marginBottom: 18, 
    textAlign: 'justify',
},
button: {
    backgroundColor: '#2C5D1E',       
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
},
buttonText: {
    color: '#FFFFFF',                
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: .1,
    textTransform: 'uppercase',
},
imagebg: {
    position: 'absolute',
    width: 380, 
    height: 600, 
    top: 260,
},
});