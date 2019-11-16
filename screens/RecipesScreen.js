import React, {Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    Animated,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux'
import {FontAwesome} from '@expo/vector-icons'

class RecipesScreen extends Component{
    constructor(){
        super()
        
        this.state = {
            
        }
    }


    static navigationOptions = ({navigation}) => {
        const {params={}} = navigation.state;
        return {
            title: 'Recept',
            headerRight: (
                <TouchableOpacity
                onPress={() => params.toggleSettingsProp()}
                >
                    <FontAwesome
                    name="angle-down"
                    color= 'black'
                    style={{fontSize: 28, right: 20}}
                    />
                </TouchableOpacity>
            ),
        };
    };


    render(){
        return(
            <View>
                <FlatList
                data={this.props.reciepes}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                    <View
                    style={{height: 60, width: '100%', backgroundColor: 'green'}}
                    >
                        <TouchableOpacity>


                        </TouchableOpacity>
                    </View>

                )}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    grocieries: state.groceries,
    reciepes: state.reciepes
})

const mapDispatchToProps = dispatch => ({
    addItem: (Ingredient,Amount,AmountUnit) => dispatch(ADD(Ingredient,Amount,AmountUnit)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesScreen);