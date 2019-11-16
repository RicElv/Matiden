import React, {Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
    TextInput,
    Picker,
    Animated,
    Dimensions
} from 'react-native';
import Modal from 'react-native-modal'

class DialogBox extends Component{
    constructor(props){
        super(props)

        this.state = {
            dualButtons: props.dualButtons,
            isVisible: props.isVisible,

            mainButtonOnPress: props.mainButtonOnPress,
            secondButtonOnPress: props.secondButtonOnPress,
            mainButtonText: props.mainButtonText,
            secondButtonText: props.secondButtonText,
        }
    }

    render(){
        return(
            <Modal
            isVisible={this.props.isVisible}
            avoidKeyboard={true}
            >
                <View
                style={{backgroundColor:'white', width: '80%', height: 180, alignSelf: 'center'}}
                >
                        <View
                        style={{flex:8, justifyContent:'space-around', left: 10, zIndex: 1}}
                        >
                            {this.props.children}
                        </View>

                        <View style={{height: 1, width:'100%', backgroundColor:'black', alignSelf:'flex-end'}}></View>
                        <View
                            style={{flex: 2, flexDirection: 'row', alignSelf:'flex-end'}}
                        >        
                            {this.state.dualButtons && <TouchableOpacity
                            onPress={this.state.secondButtonOnPress}
                            style={{flex: 1}}
                            >
                            <View
                            style={{flex: 1}}
                            >
                            <Text
                                style={{alignSelf:'center', top:'20%'}}
                            >{this.state.secondButtonText}</Text>
                            </View>
                            </TouchableOpacity>
                            }

                            <TouchableOpacity
                            onPress={this.state.mainButtonOnPress}
                            style={{flex: 1}}
                            >
                            <View
                            style={{flex: 1, backgroundColor:'rgb(0, 128, 255)'}}
                            >
                            <Text
                                style={{alignSelf:'center', top:'20%', color:'white'}}
                            >{this.state.mainButtonText}</Text>
                            </View>
                            </TouchableOpacity>

                        </View>
                </View>   
            </Modal>
        )
    }
}
export default DialogBox