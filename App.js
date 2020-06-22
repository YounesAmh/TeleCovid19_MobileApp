import React from 'react'
import Navigation from './Components/Navigation'
import { FormProvider } from "./Components/config/store";

function App() {
  // console.disableYellowBox = true;
  return (
    <FormProvider>
      <Navigation />
    </FormProvider>
  );
}

export default App;
