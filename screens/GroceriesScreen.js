import React, {Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'
import DialogBox from '../components/DialogBox'
import {connect} from 'react-redux'
import {ADD, REPLACE, REMOVESELECTED, REMOVEALL} from '../actions/grocerieActions'
import Modal from "react-native-modal";


class GroceriesScreen extends Component{
    constructor(){
        super()
        
        this.state = {
            showErrorPopUp: false,
            showAddPopUp: false,
            showSettings: false,
            showUnitList: false,
            settingsTop: new Animated.Value(-81),

            Ingredient: null,
            Amount: null,
            selectedUnit: "g"
        }
    }
    
    static navigationOptions = ({navigation}) => {
        const {params={}} = navigation.state;
        return {
            title: 'Inköpslista',
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

    componentDidMount(){
        this.props.navigation.setParams({
            toggleSettingsProp: this.toggleSettings
        });
    }

    toggleSettings = () => {
        if(this.state.showSettings){
            Animated.timing(
                this.state.settingsTop,
                {
                    toValue: -81,
                    duration: 400
                }
            ).start(() => this.setState({showSettings: false}))
            
        } else {
            this.setState({showSettings: true})
            Animated.timing(
                this.state.settingsTop,
                {
                    toValue: 0,
                    duration: 400
                }
            ).start()
        }
    }


    restorePopUp = () => {
        this.setState({showAddPopUp: false, showUnitList: false, Ingredient: null, Amount: null, selectedUnit: 'g'})
    }

    newItem = () => {
        if(this.state.Ingredient != null && this.state.Ingredient != '' && this.state.Amount != null && Number(this.state.Amount) > 0){
            this.props.addItem(this.state.Ingredient, this.state.Amount, this.state.selectedUnit);
        } else {
            this.setState({showErrorPopUp: true})
        }
        this.restorePopUp()
    }

    toggleItemColor = (item) => {
        item.selected = !item.selected;
        this.props.replace(item);
    }

    switchAddToUnit = () => {
        this.setState({showAddPopUp: false, showUnitList: true})
        //this.setState({showUnitList: true})
    }

    switchUnitToAdd = (unit) => {
        this.setState({showUnitList: false, selectedUnit: unit, showAddPopUp: true})
        //this.setState({showAddPopUp: true})
    }

    render(){
        return(
            <View>
                <DialogBox
                isVisible={this.state.showErrorPopUp}
                dualButtons={false}
                mainButtonOnPress={() => this.setState({showErrorPopUp: false})}
                mainButtonText={'OK'}
                >

                    <Text
                    style={{alignSelf:'center', right: '3%'}}
                    >Fel på input!</Text>

                </DialogBox>

                <DialogBox
                dualButtons={true}
                isVisible={this.state.showAddPopUp}
                mainButtonOnPress={this.newItem}
                secondButtonOnPress={this.restorePopUp}
                mainButtonText={'Bekräfta'}
                secondButtonText={'Avbryt'}
                >
                    <View
                    style={{flex:8, justifyContent:'space-around', left: 10}}
                    >
                        <View>
                        <Text>Vara:</Text>
                        <View
                        style={{borderWidth:1, height: 20, width:'50%'}}
                        >
                            <TextInput
                            onChangeText={(text) => this.setState({Ingredient: text})}
                            maxLength={16}
                            ></TextInput>
                        </View>
                        </View>

                        <View style={{bottom: 10}}>
                            <Text
                            >Mängd:</Text>
                            
                            
                        <View
                        style={{height: 20, width:'50%', flexDirection:'row', borderWidth: 1}}
                        >
                            <TextInput
                            style={{flex: 1}}
                            maxLength={4}
                            keyboardType={"number-pad"} 
                            onChangeText={(text) => this.setState({Amount: text})}
                            ></TextInput>
                            
                            <View
                            style={{flex: 1, borderLeftWidth: 1}}
                            >
                                <TouchableOpacity
                                onPress={this.switchAddToUnit}
                                style={{flex: 1}}
                                >
                                    <View
                                    style={{flex: 1}}
                                    >
                                        <FontAwesome
                                        name="caret-square-o-down"
                                        fontSize={8} 
                                        style={{position: 'absolute', top: 3, right: 5}}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Text
                                style={{position: 'absolute', left: 2, bottom: 1}}
                                >{this.state.selectedUnit}</Text>

                            </View>
                        </View> 
                        
                        </View>
                    </View>
                    </DialogBox>
                
                        
                        <Modal
                        isVisible={this.state.showUnitList}
                        avoidKeyboard={true}
                        >
                            <View>
                            <FlatList
                            data={[{unit: 'g'}, {unit: 'hg'}, {unit: 'kg'},{unit: 'st'}]}
                            style={{alignSelf: 'center', backgroundColor: 'white'}}
                            keyExtractor={item => item.unit}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                onPress={() => this.switchUnitToAdd(item.unit)}
                                >
                                    <View
                                    style={{height: 40, width: 60, justifyContent: 'flex-end'}}
                                    >
                                        <Text
                                        style={{alignSelf: 'center', bottom: 10}}
                                        >{item.unit}</Text>
                                        <View
                                        style={{height: 1, width: '100%', backgroundColor: 'black'}}
                                        ></View>
                                    </View> 
                                </TouchableOpacity>
                            )}
                            /> 
                            </View>
                        </Modal>
                    

                    
                <View
                //Kolla olika upplösningar, (let height = Navigator.NavigationBar.Styles.General.TotalNavHeight) lösningen annars
                style={{maxHeight: Dimensions.get("window").height - 130}} 
                >
                <FlatList
                data={this.props.data}
                extraData={this.props.data}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                    <TouchableOpacity
                    onPress={() => this.toggleItemColor(item)}
                    >
                    <View
                    style={{height: 40, flexDirection:'row', borderBottomWidth: 1, borderBottomColor: 'rgb(205,205,205)',alignItems: 'center', backgroundColor: item.selected ? ('rgb(152, 230, 152)'):('white')}}
                    > 
                    <View
                    style={{flex: 2, left: 5}}
                    >
                        <Text
                        style={{fontSize: 22}}
                        >{item.Ingredient}</Text>
                    </View>
                    <View
                    style={{flex: 1, right: 5}}
                    >
                        <Text
                        style={{alignSelf: 'flex-end', fontSize: 22}}
                        >
                            {item.Amount + ' ' +  item.AmountUnit}
                        </Text>
                        </View>
                        
                    </View>
                    </TouchableOpacity>
                )}
                >
                </FlatList>
                
                </View>
                <TouchableOpacity
                onPress={() => this.setState({showAddPopUp: true})}
                >
                <View
                style={{alignSelf: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text style={{fontSize: 18, color: 'white'}}>+</Text>
                </View>
                </TouchableOpacity>
                {this.state.showSettings &&
                <Animated.View
                style={{position: 'absolute', width: 80, right: 0, backgroundColor: 'white', borderBottomWidth: 1, top: this.state.settingsTop}}
                >
                    <View
                    style={{width: 1, height: 80, position: 'absolute', backgroundColor: 'black'}}
                    ></View>
                    <FlatList
                        data={[{text: 'Ta Bort Markerade', action: this.props.removeSelected},{text: 'Rensa Listan', action: this.props.removeAll}]}
                        keyExtractor={(item) => item.text}
                        renderItem={({item}) => (
                            <TouchableOpacity
                            onPress={item.action}
                            onPressIn={this.toggleSettings}
                            >
                            <View
                            style={{height: 40, left: 6}}
                            >
                            <Text>{item.text}</Text>
                            <View
                            style={{width: 79, right: 5, height: 1, backgroundColor: 'black', bottom: -4}}
                            ></View>
                            </View>
                            </TouchableOpacity>
                        )
                        }
                        >
                    </FlatList>
                </Animated.View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        width: 50,
        height: '5%'
    },
    modalButtonsRow: {
        flex:2,
        flexDirection:'row'
    },
    modalButton:{
        flex: 1
    }
})

const mapStateToProps = state => ({
    data: state.groceries
})

const mapDispatchToProps = dispatch => ({
    addItem: (Ingredient,Amount,AmountUnit) => dispatch(ADD(Ingredient,Amount,AmountUnit)),
    replace: (item) => dispatch(REPLACE(item)),
    removeSelected: () => dispatch(REMOVESELECTED()),
    removeAll: () => dispatch(REMOVEALL())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroceriesScreen);