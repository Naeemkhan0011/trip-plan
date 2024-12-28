import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

const OTPVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(20);

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      refs[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    const payload = {
      phone: '+1 2620 0323 7631',
      otp: otp.join(''),
    };

    console.log('Payload:', payload);
    if (otp.join('') === '1234') {
      navigation.navigate('HOME_SCREEN');
    }
  };

  const refs = Array(4)
    .fill()
    .map(() => React.createRef());

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          We’ve sent you the verification code on +1 2620 0323 7631
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (refs[index] = ref)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleSubmit}
        disabled={otp.includes('')}
      >
        <Text style={styles.continueButtonText}>CONTINUE</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Re-send code in</Text>
        <Text style={styles.timerText}>
          {' '}
          0:{timer.toString().padStart(2, '0')}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    marginTop: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E8EB',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#FFF',
  },
  continueButton: {
    backgroundColor: '#6F1DE8',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resendText: {
    color: '#6C757D',
    fontSize: 14,
  },
  timerText: {
    color: '#6F1DE8',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OTPVerification;
