import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo Icons
import { DateFormate } from '../utils/DateFormate';
import { CoinsImage, GetStatusColor } from '../utils/CoinsImage';

const DepositRecordCard = ({item}) => {
    console.log(item)
    
  return (
    <View style={styles.container}>
      {/* Top left text */}
      <View style={styles.topLeft}>
      <Image
          source={CoinsImage(item?.currency)}
          style={{
            alignItems: "center",
            height: 25,
            width: 25,
            marginRight: 10,
          }}
        />
        <Text style={styles.topRightText}>{item?.currency}</Text>
      </View>
      
      {/* Top right icons + text */}
      <View style={styles.topRight}>
      <Text style={styles.title}>Deposit</Text>
      </View>
      
      {/* Second row */}
      <View style={styles.secondRow}>
        <View style={styles.column}>
          <Text style={styles.heading}>Amount</Text>
          <Text style={[styles.value,{color:'green'}]}>+{item?.amount}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.heading1}>Status</Text>
        <Text style={[styles.value, {color:GetStatusColor(item?.status)}]}>{item?.status}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.heading}>Time</Text>
          <Text style={[styles.value]}>{DateFormate(item?.createdAt)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    paddingTop:20,
    borderRadius: 10,
    shadowColor: '#000',
    marginHorizontal:10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  topLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection:'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
  },
  topRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightText: {
    marginLeft: 5,
    fontSize: 16,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  column: {
    // flex: 1,
    // alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    alignSelf:'flex-end'
  },
  heading1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf:'center'
  },
  value: {
    fontSize: 16,
    fontWeight:'500'
  },
});

export default DepositRecordCard;
