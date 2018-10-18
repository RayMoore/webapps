import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Home from './screens/HomeScreen';
import Discovery from './screens/DiscoveryScreen';
import Profile from './screens/ProfileScreen';
import Post from './screens/PostScreen';
import Message from './screens/MessageScreen';
import Login from './screens/LoginScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainAppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" color={tintColor} size={28} />
            )
        }
    },
    Discovery: {
        screen: Discovery,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="search" color={tintColor} size={28} />
            )
        }
    },
    Post: {
        screen: Post,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="plus-circle" color={tintColor} size={28} />
            )
        }
    },
    Message: {
        screen: Message,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="envelope-o" color={tintColor} size={28} />
            )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="user" color={tintColor} size={28} />
            )
        }
    }
}, {
        //router configuration
        initialRouteName: 'Home',
        order: ['Home', 'Discovery', 'Post', 'Message', 'Profile'],
        tabBarOptions: {
            activeTintColor: '#eb765a',
            inactiveTintColor: 'black',
            style: {
                backgroundColor: 'white',
            }
        },

    })

export default createStackNavigator({
    MainApp: MainAppTabNavigator,
    Auth: Login
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    });
