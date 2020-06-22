import * as React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Text } from 'galio-framework'
 import { Fontisto } from '@expo/vector-icons';
 import DateTimePicker from '@react-native-community/datetimepicker';
import {
    CONTACTPERSONNECHOICES,
} from '../../config/Choices'

export default ({ handleChange, values, handleBlur, setFieldValue }) => {
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState('date');

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        const currentDatee = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate()
        handleChange(currentDatee)
        setFieldValue('DateExposition', currentDatee)

    };

    return (
        <View style={styles.container}>

            <View style={styles.zone}>
                <Text style={styles.zoneText}>Histoire de séjour dans une zone d’exposition à risque : </Text>
                <Picker
                    selectedValue={values.expose}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("expose")}
                >

                     <Picker.Item label="non" value="non" key="0" color='#000' />
                    <Picker.Item label="oui" value="oui" key="1" color='#000' />
                </Picker>
                {values.expose == "oui" ?
                    <>
                        <Text style={styles.zoneText}>Si oui, laquelle :</Text>
                        <TextInput
                            value={values.Zone}
                            style={styles.textInput}
                            placeholder="Écrivez ici..."
                            onChangeText={handleChange(`Zone`)}
                            placeholderTextColor={'#d3d0d2'}
                        />
                         <Text style={styles.zoneText}>Date d’exposition :</Text>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity onPress={() => { setShow(true) }}>
                                <Fontisto name="date" size={24} color="black" />
                            </TouchableOpacity >
                            {show ? <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                onChange={onChange}
                            /> : null}
                            <TouchableOpacity onPress={() => { setShow(true) }}>
                                <View pointerEvents="none" >
                                    <TextInput style={styles.textInput} value={values.DateExposition} placeholder="Selection la date" />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </>
                    : null}
               
            </View>


            <View style={styles.zone}>
                <Text style={styles.zoneText}>Contact avec un cas confirmé de COVID- 19 : </Text>
                <Picker
                    selectedValue={values.ContactConfirme}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("ContactConfirme")}
                >
                    <Picker.Item label="non" value="non" key="0" color='#000' />
                    <Picker.Item label="oui" value="oui" key="1" color='#000' />
                </Picker>
                {values.ContactConfirme === "oui" ?
                    <>
                        <Text style={styles.zoneText}>Si oui, laquelle :</Text>
                        <Picker
                            selectedValue={values.ContactPersonne}
                            style={{
                                width: 200,
                                alignSelf: "center",
                                marginTop: -15,
                                marginBottom: 15,
                            }}
                            onValueChange={handleChange("ContactPersonne")}
                        >
                            {CONTACTPERSONNECHOICES.map(function (item) {
                                let key = 0;
                                return (
                                    <Picker.Item label={item.value} value={item.value} key={item.key} color='#000' />
                                )
                            })
                            }
                        </Picker>
                        {values.ContactPersonne === "Autre, préciser" ?
                        <>
                        <Text style={styles.zoneText}>préciser :</Text>
                        <TextInput
                            value={values.AutreContact}
                            style={styles.textInput}
                            placeholder="Écrivez ici..."
                            onChangeText={handleChange(`AutreContact`)}
                            placeholderTextColor={'#d3d0d2'}
                        />
                    </>
                    : null}
                    </>
                    : null}

              

            </View>

            <View style={styles.zone}>
                <Text style={styles.zoneText}>Source de contamination inconnue : </Text>
       
                <Picker
                    selectedValue={values.SourceInconnue}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("SourceInconnue")}
                >
                    <Picker.Item label="non" value="non" key="0" color='#000' />
                    <Picker.Item label="oui" value="oui" key="1" color='#000' />
                </Picker>
            </View>

            <Text style={{ color: '#FFF' }}>{JSON.stringify(values, null, 2)}</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#273c75',
        marginLeft: 10,
        marginRight: 10,
    },
    dropdowncontainer: {
        width: 200,
        alignSelf: "center",
        marginTop: -15,
        marginBottom: 15,
    },
    dropdown: {
        color: '#ecf0f1',
    },
    zone: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ecf0f1',
        marginTop: 7,
        marginBottom: 7,
    },
    zoneText: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 25,
        color: '#ecf0f1',
    },
    datepicker: {
        width: 250,
        marginTop: 15,
        marginBottom: 15,
    },
    textInput: {
        width: 200,
        height: 40,
        fontSize: 16,
        color: '#ecf0f1',
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d3d0d2',
    },
});
