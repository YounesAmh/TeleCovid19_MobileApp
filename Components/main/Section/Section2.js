import * as React from 'react';
import { StyleSheet, View, TextInput, Button, Picker } from 'react-native';
import { Text } from 'galio-framework'
import { Dropdown } from 'react-native-material-dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {
    TABAGISMECHOICES,
} from '../../config/Choices'

export default ({ handleChange, values, handleBlur, setFieldValue }) => {
    const [Comorbidite, setComorbidite] = React.useState([{ value: '', key: '' }]);
    const [Medicaments, setMedicaments] = React.useState([{ value: '', key: '' }]);

    React.useEffect(() => {
        fetch(`https://telecovidprojet.herokuapp.com/api/Comorbidite/`, {
            method: 'GET',
            headers: {
                Accept:
                    'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(res => {
                res.map(function (item) {
                    setComorbidite(Comorbidite => [{ value: item.NomAntecedent, key: item.id }, ...Comorbidite]);
                });
            }
            )
            .catch(error => console.log(error))

        //  Fetch les Medicaments   
        fetch(`https://telecovidprojet.herokuapp.com/api/Medicaments/`, {
            method: 'GET',
            headers: {
                Accept:
                    'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(res => {
                res.map(function (item) {
                    setMedicaments(Medicaments => [{ value: item.NomMedicament, key: item.id }, ...Medicaments]);
                });
            }
            )
            .catch(error => console.log(error))


    }, []);



    return (
        <View style={styles.container}>
            <View style={{ marginTop: 30 }} />
            <View style={styles.zone}>
                {values.comordibite.map(({ text }, index) => (
                    <View key={index}>
                        <Text style={styles.zoneText}>Statut matrimonial : #{index + 1}</Text>
                        <Picker
                            selectedValue={values.comordibite[index].Comorbidite}
                            style={{
                                width: 200,
                                alignSelf: "center",
                                marginTop: -15,
                                marginBottom: 15,
                            }}
                            onValueChange={handleChange(`comordibite[${index}].Comorbidite`)}
                        >
                            {Comorbidite.map(function (item) {
                                let key = 0;
                                return (
                                    <Picker.Item label={item.value} value={item.value} key={index} color='#000' />
                                )
                            })
                            }
                        </Picker>
                        <Text style={styles.zoneText}>Age au diagnostic: #{index + 1}</Text>
                        <TextInput
                            key={index}
                            value={values.comordibite[index].AgeAuDiagnostic}
                            style={styles.textInput}
                            placeholder="Écrivez ici..."
                            onChangeText={handleChange(`comordibite[${index}].AgeAuDiagnostic`)}
                            placeholderTextColor={'#d3d0d2'}
                            keyboardType='numeric'
                            onBlur={handleBlur(`comordibite[${index}].AgeAuDiagnostic`)}

                        />
                        <Text style={styles.zoneText}>Prise de traitement Pharmaceutique: #{index + 1}</Text>
                        <RadioForm
                            radio_props={[
                                { label: 'non', value: 'non', key: 0 },
                                { label: 'oui', value: 'oui', key: 1 }
                            ]}
                            // initial={begin ? 1 : `comordibite[${index}].PriseDeTraitement.key`}
                            labelHorizontal={false}
                            buttonColor={'#2196f3'}
                            onPress={(value) => {
                                setFieldValue(`comordibite[${index}].PriseDeTraitement`, value)
                            }
                            }
                        />
                    </View>

                ))}
                <Button onPress={() => setFieldValue('comordibite', [...values.comordibite, ''])} title="ajouter un Comorbidité" />

                <Text style={styles.zoneText}>Autres maladies graves (A préciser) </Text>
                <TextInput
                    value={values.AutresMaladies}
                    style={styles.textInput}
                    placeholder="Écrivez ici..."
                    onChangeText={handleChange(`AutresMaladies`)}
                    placeholderTextColor={'#d3d0d2'}

                />
            </View>
            <View style={styles.zone}>
                <Text style={styles.zoneText}>Vaccination BCG: </Text>
                <Picker
                    selectedValue={values.VaccinationBCG}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("VaccinationBCG")}
                >
                    <Picker.Item label="non" value="non" key="0" color='#000' />
                    <Picker.Item label="oui" value="oui" key="1" color='#000' />
                </Picker>
            </View>


            <View style={styles.zone}>
                {values.Medicaments.map(({ text }, index) => (
                    <View key={index}>
                        <Text style={styles.zoneText}>Utilisation des médicaments:  #{index + 1}</Text>

                        <Picker
                            selectedValue={values.Medicaments[index].medicament}

                            style={{
                                width: 200,
                                alignSelf: "center",
                                marginTop: -15,
                                marginBottom: 15,
                            }}
                            onValueChange={handleChange(`Medicaments[${index}].medicament`)}

                        >
                            {Medicaments.map(function (item) {
                                let key = 0;
                                return (
                                    <Picker.Item label={item.value} value={item.value} key={index} color='#000' />
                                )
                            })
                            }
                        </Picker>
                        <Text style={styles.zoneText}>Age au diagnostic: #{index + 1}</Text>
                        <TextInput
                            key={index}
                            value={values.Medicaments[index].DureeUtilisation}
                            style={styles.textInput}
                            placeholder="Écrivez ici..."
                            onChangeText={handleChange(`Medicaments[${index}].DureeUtilisation`)}
                            placeholderTextColor={'#d3d0d2'}
                            keyboardType='numeric'
                            onBlur={handleBlur(`Medicaments[${index}].DureeUtilisation`)}

                        />
                    </View>

                ))}
                <Button onPress={() => setFieldValue('Medicaments', [...values.Medicaments, ''])} title="ajouter une maladie" />

                <Text style={styles.zoneText}>Autres, préciser </Text>
                <TextInput
                    value={values.AutreMedicaments}
                    style={styles.textInput}
                    placeholder="Écrivez ici..."
                    onChangeText={handleChange(`AutreMedicaments`)}
                    placeholderTextColor={'#d3d0d2'}
                />
            </View>




            {values.sexe === 'Femme' ?
                <View style={styles.zone}>
                    <Text style={styles.zoneText}>Grossesse encours: </Text>
                    <Picker
                        selectedValue={values.Grossesse}
                        style={{
                            width: 200,
                            alignSelf: "center",
                            marginTop: -15,
                            marginBottom: 15,
                        }}
                        onValueChange={handleChange("Grossesse")}
                    >
                        <Picker.Item label="non" value="non" key="0" color='#000' />
                        <Picker.Item label="oui" value="oui" key="1" color='#000' />
                    </Picker>

                    {values.Grossesse === 'oui' ?
                        <>
                            <Text style={styles.zoneText}> préciser le nombre de semaine d'aménorrhée </Text>
                            <TextInput
                                value={values.NbSemaineamenorrhee}
                                style={styles.textInput}
                                placeholder="Écrivez ici..."
                                onChangeText={handleChange(`NbSemaineamenorrhee`)}
                                placeholderTextColor={'#d3d0d2'}
                            />
                        </>
                        : null
                    }
                </View>

                : null}




<View style={styles.zone}>
<Text style={styles.zoneText}>Tabagisme actif : </Text>
<Picker
                    selectedValue={values.TabagismeActif}
                    style={{
                        width: 200,
                        alignSelf: "center",
                        marginTop: -15,
                        marginBottom: 15,
                    }}
                    onValueChange={handleChange("TabagismeActif")}
                >
                    {TABAGISMECHOICES.map(function (item) {
                        let key = 0;
                        return (
                            <Picker.Item label={item.value} value={item.value} key={item.key} color='#000' />
                        )
                    })
                    }
                </Picker>

                    {(values.TabagismeActif === "Fumeur" || values.TabagismeActif === "Ex-fumeur") ? 
                      <>
                      <Text style={styles.zoneText}> Durée de consommation (année) :  </Text>
                      <TextInput
                          value={values.DureeDeConsommation}
                          style={styles.textInput}
                          placeholder="Écrivez ici..."
                          onChangeText={handleChange(`DureeDeConsommation`)}
                          placeholderTextColor={'#d3d0d2'}
                      />
                  </>
                : null}


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
