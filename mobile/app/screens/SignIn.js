import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Text, StyleSheet } from 'react-native';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSignIn = () => {
    setShowPin(true);
  };

  const submitPin = () => {
    const payload = new URLSearchParams();
    payload.append('method', 'login_webnero');
    payload.append('email', email);
    payload.append('password', password);
    payload.append('code', pin);
  
    fetch('https://passport.electronero.org/passport/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.toString()
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status.success) {
          navigation.navigate('Home', {
            email: email,
            password: password,
            code: pin,
            etnx_balance: 0.00000000,
            etnxp_balance: 0.000000,
            etnx_aindex: data.data.etnx_aindex,
            etnxp_aindex: data.data.etnxp_aindex,
            etnx_user_id: data.data.etnx_uid, 
            etnxp_user_id: data.data.etnxp_uid, 
            transactions: []
          });
        }
      })
      .catch(err => console.error(err));
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign In" onPress={handleSignIn} />

      <Modal visible={showPin} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter 5-digit PIN</Text>
            <TextInput
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              secureTextEntry
              maxLength={5}
              style={styles.input}
            />
            <Button title="Submit" onPress={submitPin} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
    width: '80%'
  }
});
