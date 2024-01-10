import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import NivelesScreen from "../screens/NivelesScreen";
import JuegosScreen from "../screens/JuegosScreen";
import GameOverScreen from "../screens/GameOverScreen";


const Stack = createStackNavigator();
function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegistroScreen}/>
            <Stack.Screen name="Drawer" component={MyDrawer} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();
function MyDrawer(){
    return(
        <Drawer.Navigator initialRouteName="Welcome">
            <Drawer.Screen name="Welcome" component={WelcomeScreen}/>
            <Drawer.Screen name="Niveles" component={NivelesScreen}/>
            <Drawer.Screen name="Juegos" component={JuegosScreen} />
            <Drawer.Screen name="GameOver" component={GameOverScreen}/>
        </Drawer.Navigator>
    )
}

export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyDrawer/>
        </NavigationContainer>
    )
}