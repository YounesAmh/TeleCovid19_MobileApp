import * as React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Text } from 'galio-framework'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import {
    SEXECHOICES,
    STATUTCHOICES,
    NIVEAUETUDECHOICES,
    ACTIVITECHOICES,
    MILIEUCHOICES, REVENUCHOICES
} from '../../config/Choices'


export default ({ handleChange, values, setFieldValue }) => {
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState('date');

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        const currentDatee = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate()
        handleChange(currentDatee)
        setFieldValue('currentDatee', currentDatee)

    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 30 }} />
            <View style={styles.zone}>
                <Text style={styles.zoneText}>Date de naissance :</Text>
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
                            <TextInput style={styles.textInput} value={values.currentDatee} placeholder="Selection la date" />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.zone}>
                <Text style={styles.zoneText}>Sexe :</Text>
                <Picker
                    selectedValue={values.sexe}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("sexe")}
                >
                    {SEXECHOICES.map(function (item) {
                        let key = 0;
                        return (
                            <Picker.Item label={item.value} value={item.value} key={item.key} color='#000' />
                        )
                    })
                    }
                </Picker>
            </View>
            <View style={styles.zone}>
                <Text style={styles.zoneText}>Statut matrimonial :</Text>
                <Picker
                    selectedValue={values.statutMatrimonial}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("statutMatrimonial")}
                >
                    {STATUTCHOICES.map(function (item) {
                        let key = 0;
                        return (
                            <Picker.Item label={item.value} value={item.value} key={item.key} color='#000' />
                        )
                    })
                    }
                </Picker>
                {values.statutMatrimonial == 'Non précisée' ?
                    <TextInput placeholder="Précisez..."
                        style={styles.textInput}
                        value={values.autreStatutmatrimonial}
                        onChangeText={handleChange("autreStatutmatrimonial")}
                        placeholderTextColor={'#d3d0d2'}
                    />
                    : null
                }
            </View>


            <View style={styles.zone}>
                <Text style={styles.zoneText}>Nombre d’enfants :</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Écrivez ici..."
                    value={values.NbEnfants}
                    onChangeText={handleChange("NbEnfants")}
                    placeholderTextColor={'#d3d0d2'}
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.zone}>
                <Text style={styles.zoneText}>Niveau d’étude :</Text>

                <Picker
                    selectedValue={values.niveauetude}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("niveauetude")}
                >
                    {NIVEAUETUDECHOICES.map(function (item) {
                        let key = 0;
                        return (
                            <Picker.Item label={item.value} value={item.value} key={item.key} color='#000' />
                        )
                    })
                    }
                </Picker>
            </View>

            <View style={styles.zone}>
                <Text style={styles.zoneText}>Activité : </Text>

                <Picker
                    selectedValue={values.Activite}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("Activite")}
                >
                    {ACTIVITECHOICES.map(function (item) {
                        let key = 0;
                        return (
                            <Picker.Item label={item.value} value={item.value} key={item.key} color='#000' />
                        )
                    })
                    }
                                    </Picker>

                    {values.Activite === 'Actif' ?
                        <TextInput placeholder="poste de travail occupé"
                            style={styles.textInput}
                            value={values.ActiviteSiActive}
                            onChangeText={handleChange("ActiviteSiActive")}
                            placeholderTextColor={'#d3d0d2'}

                        />
                        : null
                    }
                
                    {values.Activite == 'Autre, préciser' ?
                        <TextInput placeholder="Précisez..."
                            style={styles.textInput}
                            value={values.AutreActivite}
                            onChangeText={handleChange("AutreActivite")}
                            placeholderTextColor={'#d3d0d2'}

                        />
                        : null
                    }
            </View>





            <View style={styles.zone}>
                <Text style={styles.zoneText}>Revenu mensuel du ménage :</Text>
                <Picker
                    selectedValue={values.revenu}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("revenu")}
                >
                    {REVENUCHOICES.map(function (item) {
                        let key = 0;
                        return (
                            <Picker.Item label={item.value} value={item.value} key={item.key} color='#000' />
                        )
                    })
                    }
                </Picker>
            </View>


            <View style={styles.zone}>
                <Text style={styles.zoneText}>Adresse actuelle :</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Quartier"
                    value={values.Quartier}
                    onChangeText={handleChange("Quartier")}
                    placeholderTextColor={'#d3d0d2'}

                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Ville"
                    value={values.Ville}
                    onChangeText={handleChange("Ville")}
                    placeholderTextColor={'#d3d0d2'}
                />
            </View>


            <View style={styles.zone}>
                <Text style={styles.zoneText}>Milieu de résidence :</Text>
                <Picker
                    selectedValue={values.MilieuDeResidence}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("MilieuDeResidence")}
                >
                    {MILIEUCHOICES.map(function (item) {
                        let key = 0;
                        return (
                            <Picker.Item label={item.value} value={item.value} key={item.key} color='#000' />
                        )
                    })
                    }
                </Picker>
            </View>
            <View style={styles.zone}>
                <Text style={styles.zoneText}>Mesures Physiques :</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Poids"
                    value={values.Poids}
                    onChangeText={handleChange("Poids")}
                    placeholderTextColor={'#d3d0d2'}

                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Taille"
                    value={values.Taille}
                    onChangeText={handleChange("Taille")}
                    placeholderTextColor={'#d3d0d2'}
                />
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
