import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Section1 from './Section/Section1'
import Section2 from './Section/Section2'
import Section3 from './Section/Section3'
import SendData from './Section/SendData'


import { Formik } from "formik";
import { useFormState, useFormDispatch } from "../config/store";




export default function reducer(props) {
  const {navigation} = props

  const form = React.useRef();
  const dispatch = useFormDispatch();
  const { values: formValues, errors: formErrors } = useFormState("customer");
  
  
  React.useEffect(() => {       
    const unsubscribe = navigation.addListener("blur", () => {
        if (form.current) {
            const { values, errors } = form.current;
            dispatch({
                type: "UPDATE_FORM",
                payload: {
                    id: "customer",
                    data: { values, errors }
                }
            });
        }
    });
  
    return unsubscribe;
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <View style={{marginTop: 20}} />
      <Formik
            innerRef={form}
            initialValues={formValues}
            initialErrors={formErrors}
            enableReinitialize
        >
            {({ values, handleChange, setFieldValue, handleBlur }) => (


       <ProgressSteps marginBottom={30}>

        <ProgressStep label="Informations Générales">
          <Section1 navigation={navigation} setFieldValue={setFieldValue} values={values} handleChange={handleChange}/>
        </ProgressStep>

        <ProgressStep label="Comorbidité">
          <Section2 navigation={navigation} handleBlur={handleBlur} setFieldValue={setFieldValue} values={values} handleChange={handleChange}/>
        </ProgressStep>

        <ProgressStep label="Circonstance de la maladie">
          <Section3 navigation={navigation} handleBlur={handleBlur} setFieldValue={setFieldValue} values={values} handleChange={handleChange}/>
        </ProgressStep>

        <ProgressStep label="Verification">
          <SendData navigation={navigation} handleBlur={handleBlur} setFieldValue={setFieldValue} values={values} handleChange={handleChange}/>
        </ProgressStep>

      </ProgressSteps>
       )}
       </Formik>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#273c75',
  },

});
