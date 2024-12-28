import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Switch,
} from 'react-native';
import AppImage from '../../components/AppImage';
import config from '../../config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and Password are required');
      return;
    }

    // const payload = {
    //   email,
    //   password,
    //   rememberMe,
    // };

    // try {
    //   const response = await fetch('https://your-api-endpoint.com/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   const data = await response.json();

    //   if (email === 'khalid@gmail.com' && password === '123456') {
    //     Alert.alert('Success', 'Login successful!');
    //     console.log('Response Data:', data); // You can handle this data further
    //   } else {
    //     Alert.alert('Error', data.message || 'Login failed');
    //   }
    // }
    navigation.navigate('OTP_VERIFICATION');
    // try {
    //   if (email === 'khalid@gmail.com' && password === '123456') {
    //     Alert.alert('Success', 'Login successful!');
    //     navigation.navigate('OTP_VERIFICATION');
    //   } else {
    //     Alert.alert('Error Login failed');
    //   }
    // } catch (error) {
    //   Alert.alert('Error', 'Something went wrong. Please try again.');
    //   console.error('Login Error:', error);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AppImage
          imageSource={config.ImageList.appLogo}
          imageStyle={{
            width: 250,
            height: 250,
          }}
        />
        <Text style={styles.title}>Welcome to TripsNav</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.signInText}>Sign in</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="abc@email.com"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rememberMeContainer}>
            <Switch
              value={rememberMe}
              onValueChange={(value) => setRememberMe(value)}
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>OR</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Login with Facebook</Text>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 8,
          }}
        >
          <Text> Don't have an account </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SIGN_UP')}>
            <Text style={styles.signUpText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    backgroundColor: '#e0f0ff',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    color: '#4b7bec',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  formContainer: {
    width: '80%',
  },
  signInText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    elevation: 1,
  },
  input: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 5,
    color: '#666',
  },
  forgotPasswordText: {
    color: '#4b7bec',
  },
  signInButton: {
    backgroundColor: '#4b7bec',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    marginVertical: 20,
    color: '#666',
  },
  socialContainer: {
    width: '80%',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  socialText: {
    fontSize: 16,
    color: '#333',
  },

  signUpText: {
    fontSize: 14,
    color: '#333',
    color: '#4b7bec',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
