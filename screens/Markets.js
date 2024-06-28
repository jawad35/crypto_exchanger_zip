import { View, Text, TouchableOpacity, FlatList, Image, Animated, StyleSheet, Pressable, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons, AntDesign, Feather} from '@expo/vector-icons';
import { ScrollView } from 'react-native-virtualized-view';
import { connect } from 'react-redux';
import { getCoinMarket } from '../stores/market/marketActions';

const listTab = [
    {
        status: 'Optional'
    },
    {
        status: 'Options'
    },
    {
        status: 'Spot'
    },
    {
        status: 'USDT-M'
    }

]

const Markets = ({ getCoinMarket, coins, navigation}) => 
{
    const [status, setStatus] = useState('Optional')
    const setStatusFilter = status => {
        setStatus(status)
    }
    const scrollX = React.useRef(new Animated.Value(0)).current;
    
        React.useEffect(() =>
        {
            getCoinMarket()
    
    
        }, [])

    return(
        <GestureHandlerRootView>
        <SafeAreaView style={styles.container}>
            <View
        style={{
          padding: 15,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (currentUser) {
                navigation.openDrawer();
              } else {
                setShowModal(true);
              }
            }}
          >
            <MaterialCommunityIcons name="dots-grid" size={40} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 70,
              alignItems: "center",
            }}
            onPress={() => handleNavigation("Searchbar")}
          >
            <AntDesign
              name="search1"
              size={24}
              color="gray"
              style={{ marginRight: 5 }}
            />
            <TextInput placeholder="Search coin pairs"></TextInput>
          </View>

          <AntDesign name="customerservice" size={33} color="black" style={{ marginTop: 2}} />
        </View>
      </View>
            <View style={styles.listTab}>
                {
                    listTab.map(e => (
                        <TouchableOpacity style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                        onPress={() => setStatusFilter(e.status)}>
            <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>{e.status} </Text>
        </TouchableOpacity>
                    ))
                }
            </View>
            <ScrollView style={{
            backgroundColor: 'white'
        }}>
    
            <View
                style={{
                    flex: 1, 
                flexDirection: 'row',
                justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    paddingBottom: 200
                }}
            > 
                <FlatList
                    data={coins}
                    keyExtractor={item => item.dz}
                    renderItem={({ item, index }) =>
                    {

                        let priceColor = (item.price_change_percentage_7d_in_currency == 0 ? "grey" : (item.price_change_percentage_7d_in_currency > 0) ? "green" : "red")

                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: 25,
                                    marginBottom: 15,
                                    marginTop: 15,
                                    alignSelf: 'center',
                                    alignItems: 'center'

                                }}
                            >
                                {/*coins*/}
                                <Image
                                source={{ uri: item.image }}
                                style={{
                                    height: 35,
                                    width: 35,
                                }}
                            />
                                <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                    }}
                                >

                                    <Text 
                                    style= {{
                                        color: "black",
                                        fontSize: 15,
                                        textTransform: "uppercase",
                                        fontWeight: 'bold'
                                        
                                    }}
                                    >{item.symbol}USDT</Text>


                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-center",
                                        alignItems: "center",
                                        alignSelf: 'center',

                                    }}>
                                    <Text style={{
                                        textTransform: "uppercase",
                                        color: "gray",
                                        marginRight: 5,
                                        alignItems: "center"
                                    }}>{item.symbol}</Text>
                                    <Text
                                     style={{
                                        paddingHorizontal: 7,
                                        backgroundColor: 'aqua',
                                        textAlign: 'center'
                                     }}>
                                        10X
                                    </Text>
                                    </View>

                                </View>
                                {/*linechart*/}
                                {/*linechart*/}
                                <View 
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    <LineChart
                                        withVerticalLabels={false}
                                        withHorizontalLabels={false}
                                        withDots={false}
                                        withInnerLines={false}
                                        withVerticaLines={false}
                                        withOutlerLines={false}
                                        withShadow={false}
                                        data={{
                                            datasets: [
                                                {
                                                    data: item.sparkline_in_7d.price
                                                }
                                            ]
                                        }}
                                        width={100}
                                        height={40}
                                        chartConfig={{
                                            color: () => priceColor,
                                            backgroundGradientFromOpacity: 0,
                                             backgroundGradientToOpacity: 0,
                                             propsForBackgroundLines: {
                                             strokeDasharray: "4",
                                                strokeWidth: 0, // If you put 0 in the value no line is displayed
                                                strokeDasharray: "4",
                                                strokeWidth: 0, // If you put 0 in the value no line is displayed
                                                stroke: `rgba(0, 0, 0, 0)`,
                                              },
                                        }}
                                        bezier
                                        style={{
                                            paddingRight: 0

                                        }}
                                    /> 
                                    </View>

                                {/*figures*/}
                                <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    alignSelf: 'center',
                                    justifyContent: "flex-end",

                                }}
                                >
                                    <Text
                                style={{
                                    color: 'black',
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>
                                    $ {item.current_price}
                                </Text>
                                
                                <View style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                {
                                    item.price_change_percentage_7d_in_currency !=0 &&
                                    <Feather
                                    name="arrow-up"
                                    size={15}
                                    style={{
                                        color: priceColor,
                                        transform: item.price_change_percentage_7d_in_currency > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                                    }}
                                  />
                                }
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: priceColor,
                                        fontWeight: 'bold'
                                    }}
                                    > {item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                                    </View>
                                </View>
                                {/*figures*/}
                            </View>

                        )
                    }}
                    style={{ height: '100%', width: '100%' }}
                />
                </View>
                </ScrollView>

           </SafeAreaView>
           </GestureHandlerRootView>
    )
}

function mapStateToProps(state)
{
    return {
        coins: state.marketReducer.coins,
        state: state
    }
}


function mapDispatchToProps(dispatch)
{
    return {
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage,
            page) => { return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets)

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: "white"
    },
    listTab: {
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 10
    },
    btnTab: {
        width: 100,
        flexDirection: "row",
        padding: 8,
        justifyContent: "center"
    },
    textTab: {
     fontSize: 16,
     color: "silver",
    },
    btnTabActive: {
        backgroundColor: 'aqua',
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: "aqua",
    },
    textTabActive: {
        color: "black",
    }
})