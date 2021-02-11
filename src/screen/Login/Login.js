import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
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
    width: 200,
    height: 162,
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
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#ffffff',
  },
  singupText: {
    color: '#465881',
  },
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login } = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.flexOne}
      style={styles.scrollView}
      extraScrollHeight={200}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/img/logo-books.png')}
          style={styles.logoBooks}
        />
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
          style={styles.loginBtn}
          onPress={() => login(email, password)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.singupText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
