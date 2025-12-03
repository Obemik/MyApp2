import React, {useState} from "react";
import { colors } from "../components/Color";
import { View, Text , StyleSheet, Image, TouchableOpacity, Modal, TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const SupportModal = ({ onClose }) => {
    const [firstName, setFirstName] = useState("");
    const [number, setNumber] = useState("");
    const [text, setText] = useState("");

    const handleSend = () => {
        if(!firstName || !number || !text){
            console.error("Please fill in all fields.");
            return;
        }
        console.log("Sending data:", { firstName, number, text });
        onClose();
    }

    return(
        <Modal
        transparent={true}
        animationType="slide"
        visible={true}
        >
            <View style={styles.modalOverlay}>
                <SafeAreaView style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close-circle" size={24} color={colors.title}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Write to us</Text>
                    <View >
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            placeholder="First Name"
                            onChangeText={setFirstName}
                            placeholderTextColor="#696868ff"
                        />
                        <TextInput
                            style={styles.input}
                            value={number}
                            placeholder="+38 (___) ___-__-__"
                            onChangeText={setNumber}
                            keyboardType="numeric"
                            placeholderTextColor="#696868ff"
                        />
                        <TextInput
                            style={styles.input}
                            value={text}
                            placeholder="Enter your message"
                            onChangeText={setText}
                            placeholderTextColor="#696868ff"
                        />
                        <TouchableOpacity style={styles.wrapButton} onPress={handleSend}>
                            <Text style={styles.titleButton}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
};

const styles= StyleSheet.create({
    modalOverlay:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.5)",
        alignItems:"center",
    },
    modalContent:{
        backgroundColor:colors.lightgrey,
        borderRadius:10,
        width:"90%",
        padding:20,
    },
    closeButton:{
        position:"absolute",
        top:10,
        right:10,
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center",
        marginVertical:20,
        color:colors.green
    },
    input:{
        height:40,
        borderColor:colors.dark,
        borderWidth:1,
        marginBottom:16,
        paddingLeft:8,
        paddingRight:16,
        width:300,
        textAlign:"center",
        color:colors.white
    },
    wrapButton:{
        backgroundColor:colors.green,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:18,
    },
    titleButton:{
        fontSize:16,
        color:colors.white,
        textAlign:"center",
    },
});
export default SupportModal;