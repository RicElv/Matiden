import React, {Component} from "react"
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


class HomeScreen extends Component{
    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.background}>
                <View style={styles.squareView}>
                <TouchableOpacity
                    onPress={() => navigate('Recipes')}
                    >
                    <View style={styles.square}>
                        <Text> Recept </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigate('Groceries')}
                    >
                    <View style={styles.square}> 
                        
                        <Text> Inköpslista </Text>
                        
                    </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        //77,0,57
        backgroundColor: 'rgb(255,222,164)',
        flex: 1,
    },
    squareView: {
        top: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
        
    },
    square: {
        backgroundColor: 'white',
        height: 150,
        width: 150
    },
    randomBtn: {

    }
});

export default HomeScreen;