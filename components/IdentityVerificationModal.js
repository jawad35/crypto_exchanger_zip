import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

const IdentityVerificationModal = ({isModalVisible, toggleModal, props}) => {
    return (
        <View>
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalContent}>
                        <Ionicons style={{ position: 'absolute', top: 10, right: 10 }} name="close" size={30} color="black" onPress={toggleModal} />
                        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 40 }}>Please complete primary certification first</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            props.navigation?.navigate("PrimaryVerificationReview")
                            toggleModal()
                        }}>
                            <Text style={styles.buttonText}>Go Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'aqua',
        padding: 10,
        borderRadius: 20,
        marginTop: 25,
        width: 150,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight:'600'
    },
});
export default IdentityVerificationModal;
