import React, { useState , Component }from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import TitleText from '../Components/TitleText'
import Input from '../Components/Input' 


const LoginPage = props => {
    const [enteredEmail, setEnteredEmail] = useState();

    const [enteredPassword, setEnteredPassword] = useState();

    const emailInputHandler = (enteredEmail) =>{
        setEnteredEmail(enteredEmail);
    };

    const passwordInputHandler = (enteredPassword) => {
        setEnteredPassword(enteredPassword);
    };
    

    return (
        <View style={styles.screen}>
            <TitleText style={styles.title}>Facera</TitleText>
            <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={emailInputHandler}
                placeholder="Enter Email"
                value={enteredEmail}
                email= {true}
            />
            <Input
                style={styles.input_second}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={passwordInputHandler}
                placeholder="Enter Password"
                value={enteredPassword} 
                email={false}
                secureTextEntry={true}
            />

            <Button
                title="Login"
                buttonStyle={{ 
                    marginTop: 50,
                    backgroundColor: '#40E0D0' }}
            />

            <Button
                title="Sign Up"
                buttonStyle={{ 
                    marginTop: 20,
                    backgroundColor: '#40E0D0' }}
            />

            <Button
                title="Forget Password"
                titleStyle={{
                    textDecorationLine: 'underline',
                }}
                buttonStyle={{
                    marginTop: 20,
                }}
                type="clear"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        width: '100%',
        padding: 20,
        fontSize: 45,
        textAlign: 'center',
        color: '#40E0D0',
    },
    input: {
        width: '100%',
    },
    input_second: {
        width: '100%',
    },
});

export default LoginPage;