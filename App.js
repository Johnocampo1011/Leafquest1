// App.js - FINAL REVISED: Login Screen with Logo, Green Card, Labels, AND Links

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, ImageBackground, View, SafeAreaView, TextInput, Button, TouchableOpacity, InteractionManager, Image,  Alert,
  ActivityIndicator, } from 'react-native';
import { useState } from 'react';
import { HomeStackScreen } from './HomeStack';
import React from 'react';
import QuizScreen from './QuizDifficultyScreen';
import { WebView } from 'react-native-webview';
import QuizDifficultyScreen from './QuizDifficultyScreen';
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import HomeScreenContent from './Homescreen';




// --- LoginScreen component (Logo + Green Card + Labels + Links) ---
export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  if (email.trim() === "" || password.trim() === "") {
    Alert.alert("Error", "Please fill in both email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigation.navigate("MessageScreen");
  } catch (error) {
    console.log(error);
    if (error.code === "auth/invalid-email") {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
    } else if (error.code === "auth/user-not-found") {
      Alert.alert("Account Not Found", "This email is not registered.");
    } else if (error.code === "auth/wrong-password") {
      Alert.alert("Incorrect Password", "Please try again.");
    } else {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  }
  }
  return (
        <View style={styles.loginOuterContainer}>
          <StatusBar style="auto" />
          <ImageBackground
            style={styles.imagebg}
            source={require('./assets/greenbg 1.png')}
            resizeMode="cover"
          >
            <View style={styles.centeringContainer}>
              <Image
                source={require('./assets/udm-logo.jpg')}
                style={styles.logoImage}
                resizeMode="contain"
              />
    
              <Text style={styles.mainTitle1}>LEAFQUEST</Text>
    
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>EMAIL:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
    
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>PASSWORD:</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
    
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  <Text style={styles.forgotPasswordLinkGreen}>Forgot your password?</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                  <Text style={styles.signUpLinkGreen}>
                    Don't have an account?{' '}
                    <Text style={styles.signUpLinkActionGreen}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
};

const Stack = createNativeStackNavigator();

// Main App Navigator Setup (Remains the same)
export default function App() {
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} /> 
      <Stack.Screen name="MessageScreen2" component={MessageScreen2} /> 
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="PasswordSuccessScreen" component={PasswordSuccessScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="WelcomeMessage" component={WelcomeMessage} />
      <Stack.Screen name="Homescreen" component={HomeStackScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="QuizDifficultyScreen" component={QuizDifficultyScreen} />
      

    </Stack.Navigator>
    
  </NavigationContainer>



  );
}

export function MessageScreen({ navigation }) {
      return (
  
          
          <View style={messagestyle.container}>
  
      <ImageBackground
                  style={messagestyle.imagebg}
                  source={require('./assets/Ellipse 5.png')}
                  resizeMode="cover"
      ></ImageBackground>
  
      <Text style={messagestyle.title}>WELCOME TO LEAFQUEST!</Text>
  
      <Text style={messagestyle.body}>
          Hey there, future plant parent! Ready to make your world a little greener? LeafQuest is your new helper for finding, learning about, and taking care of plants. Let's play!
      </Text>
  
      <Text style={messagestyle.body}>
          LeafQuest is your personal companion for plant nurturing, designed to help you discover, identify, and care for plants with ease. This app features a minimalist, nature-themed look that mirrors its interest in plant nurturing. It includes a warm and friendly-looking login page with bright green leaf details to produce a cool, welcoming feel.


      </Text>
  
      <TouchableOpacity style={messagestyle.button} onPress={() => navigation.navigate('MessageScreen2')}>
          <Text style={messagestyle.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
      </View>
  );
  }

  export function MessageScreen2({ navigation }) {
  
      return (
          <View style={messagestyle.container}>
  
      <ImageBackground
                  style={messagestyle.imagebg}
                  source={require('./assets/Ellipse 5.png')}
                  resizeMode="cover"
      ></ImageBackground>
  
      <Text style={messagestyle.title2}>WHY  LEAFQUEST?</Text>
  
      <Text style={messagestyle.body2}>
        LeafQuest – Your Ultimate Plant Companion! </Text>
  
      <Text style={messagestyle.body2}>
        Discover the best plants for your space, track their growth, and learn how to care for them through smart suggestions, a plant library, and fun educational content.
      </Text>
  
      <TouchableOpacity style={messagestyle.button} onPress={() => navigation.replace('Homescreen')}>
          <Text style={messagestyle.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
      </View>
  );
  }


// --- Other Screen Component Definitions (Remain the same) ---
export function ForgotPasswordScreen({ navigation }) { /* ... */
  const [username, setUsername] = useState(''); const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
  if (email.trim() === "") {
    Alert.alert("Error", "Please enter your email.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert("Success", "Password reset email sent!");
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Failed to send reset email. Check your email address.");
  }
};

  return ( 
    <View style={styles.loginOuterContainer}>
      <StatusBar style="auto" />
      <ImageBackground
        style={styles.imagebg}
        source={require('./assets/greenbg 1.png')}
        resizeMode="cover"
      >
      
        <View style={styles.centeringContainer}>
          <Text style={styles.mainTitle}>FORGOT PASSWORD</Text>
        
          <View style={styles.formContainer}>
        
            <View style={styles.inputGroup}>
              <Text style={styles.label}>USERNAME:</Text>
              <TextInput style={set1styles.input} value={username} onChangeText={setUsername}/>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL:</Text>
              <TextInput style={set1styles.input} keyboardType="email-address" value={email} onChangeText={setEmail}/> 
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('VerificationScreen')}> 
              <Text style={styles.loginButtonText}>SEND EMAIL</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export function VerificationScreen({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      Alert.alert("Success", "Verification email resent!");
    } catch (error) {
      Alert.alert("Error", "Failed to resend email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginOuterContainer}>
      <StatusBar style="auto" />
      <ImageBackground
        style={styles.imagebg}
        source={require('./assets/greenbg 1.png')}
        resizeMode="cover"
      >
        <View style={styles.centeringContainer}>
          <Text style={styles.mainTitle}>VERIFICATION</Text>

          <View style={set1styles.codeContainer}>
            {code.map((digit, idx) => (
              <TextInput
                key={idx}
                style={set1styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  const newCode = [...code];
                  newCode[idx] = text;
                  setCode(newCode);
                }}
                value={digit}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          >
            <Text style={styles.loginButtonText}>CONFIRM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendEmail}
            disabled={loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#1B5E16" />
            ) : (
              <Text style={styles.resendText}>RESEND EMAIL</Text>
            )}
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

export function ChangePasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleChangePassword = () => {
    if (password.trim() === '' || confirm.trim() === '') {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }


    navigation.navigate('PasswordSuccessScreen');
  };

  return (
    <View style={styles.loginOuterContainer}>
      <StatusBar style="auto" />
      <ImageBackground
        style={styles.imagebg}
        source={require('./assets/greenbg 1.png')}
        resizeMode="cover"
      >
        <View style={styles.centeringContainer}>
          <Text style={styles.mainTitle}>CHANGE PASSWORD</Text>

          <View style={styles.formContainer}>
            <View style={set1styles.form}>
              <TextInput
                style={set1styles.input}
                placeholder="New Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TextInput
                style={set1styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleChangePassword}
              >
                <Text style={styles.loginButtonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export function PasswordSuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={set1styles.container}>
      <Text style={set1styles.title}>Password Successfully Changed!</Text>
      
      <TouchableOpacity
        style={set1styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={set1styles.buttonText}>PROCEED TO HOMEPAGE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export function SignUpScreen({ navigation }) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const validateAndSignUp = async () => {
  if (!firstName || !lastName || !email || !username || !password || !confirm) {
    Alert.alert("Error", "Please fill in all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Invalid Email", "Please enter a valid email address.");
    return;
  }

  if (password !== confirm) {
    Alert.alert("Password Mismatch", "Passwords do not match.");
    return;
  }

  if (password.length < 6) {
    Alert.alert("Weak Password", "Password must be at least 6 characters long.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigation.navigate("WelcomeMessage");
  } catch (error) {
    console.log(error);
    if (error.code === "auth/email-already-in-use") {
      Alert.alert("Email In Use", "This email is already registered.");
    } else {
      Alert.alert("Signup Failed", error.message);
    }
  }
};

  return (
    <View style={styles.loginOuterContainer}>
      <StatusBar style="auto" />
      <ImageBackground
        style={styles.imagebg}
        source={require('./assets/greenbg 1.png')}
        resizeMode="cover"
      >
        <View style={styles.centeringContainer}>

          <Text style={styles.mainTitle}>CREATE ACCOUNT</Text>

          <View style={styles.formContainer}>
            <View style={set1styles.form}>
              <TextInput
                style={set1styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setfirstName}
              />
              <TextInput
                style={set1styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <TextInput
                style={set1styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={set1styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={set1styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={set1styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
            

            <TouchableOpacity
              style={styles.loginButton}
              onPress={validateAndSignUp}
            >
              <Text style={styles.loginButtonText}>SIGNUP</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

function WelcomeMessage({ navigation }) {
  return (
    <View style={styleswelcome.container}>
      <Text style={styleswelcome.title}>Welcome to LeafQuest!</Text>

      <Text style={styleswelcome.body}>
        Your journey to a greener life begins here. Explore, learn, and grow with us!
      </Text>

      <TouchableOpacity
        style={styleswelcome.button}
        onPress={() => {
          InteractionManager.runAfterInteractions(() => {
            navigation.replace('LoginScreen');
          });
        }}
      >
        <Text style={styleswelcome.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}






// --- Stylesheets ---

const styleswelcome = StyleSheet.create({
  // ... styleswelcome remains the same ...
  container: { flex: 1, paddingHorizontal: 30, paddingVertical: 70, justifyContent: 'center', backgroundColor: '#E5E5E5'},
  title: { fontSize: 45, fontWeight: 'bold', color: '#2C5D1E', textAlign: 'center', textTransform: 'uppercase', marginBottom: 50},
  body: { fontSize: 15, color: 'Black', lineHeight: 20, marginBottom: 25, textAlign: 'justify'},
  button: { backgroundColor: 'green', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginVertical: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16},
});

const set1styles = StyleSheet.create({
  // ... set1styles remains the same ...
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F5F0E9'},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'},
  form: { gap: 15 },
  input: { height: 45, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, fontSize: 16, borderWidth: 1, borderColor: '#ccc'},
  codeContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, marginVertical: 20},
  codeInput: { width: 65, height: 65, borderWidth: 1.5, borderRadius: 8, textAlign: 'center', fontSize: 18, borderColor: 'black', backgroundColor: '#fff',marginHorizontal: 5},
  button: { backgroundColor: 'green', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10},
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16},

});

const messagestyle = StyleSheet.create({
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
    fontWeight: 'bold',
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
    marginVertical: 60,
    marginTop: -120,
},
body2: {
     fontSize: 15,
    color: 'Black',                
    lineHeight: 20,
    marginBottom: 25, 
    textAlign: 'justify',
    fontWeight: 'bold',
},
button: {
    backgroundColor: '#2C5D1E',       
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'black'
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





// --- UPDATED styles object for LoginScreen (Green card + Logo + Links) ---
const styles = StyleSheet.create({
  loginOuterContainer: {
    flex: 1,
  },
  imagebg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centeringContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  logoImage: {
    width: 100, // Make width and height equal
    height: 100,
    borderRadius: 50, //  50% of width/height = circle
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  mainTitle1: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#97BD99',
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'stretch',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B3A5F',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3D3D3D',
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    height: 45,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '100%',
  },
  forgotPasswordLinkGreen: {
    color: '#E8F5E9',
    fontSize: 13,
    textAlign: 'center',
    width: '100%',
    marginTop: 2,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#1B5E16',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  signUpLinkGreen: {
    color: '#E8F5E9',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
  signUpLinkActionGreen: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resendButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    top: 10,
  },
  resendText: {
    color: '#1B5E16',
    fontSize: 14,
    fontWeight: 'bold',
  },
});