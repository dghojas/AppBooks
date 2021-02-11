import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/Commons/FormInput';
import { AuthContext } from '../../routes/AuthProvider';

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBooks: {
    width: 150,
    height: 130,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#465881',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#465881',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  signupBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  singupText: {
    color: '#ffffff',
  },
});

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();

  const { register } = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.flexOne}
      style={styles.scrollView}
      extraScrollHeight={200}>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../../assets/img/logo-books.png')}
          style={styles.logoBooks}
        />
        <View style={styles.inputView}>
          <FormInput
            labelValue={name}
            onChangeText={(userName) => setName(userName)}
            placeholderText="Name"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <FormInput
            labelValue={phone}
            onChangeText={(userPhone) => setPhone(userPhone)}
            placeholderText="Phone"
            iconType="user"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText="Email"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <FormInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => register(name, email, password, phone)}>
          <Text style={styles.singupText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
