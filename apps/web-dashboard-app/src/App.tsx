import React from 'react';
import RootLayout from "./components/layouts/RootLayout";
import GlobalStyles from "./global/style/GlobalStyles";

function App() {
  return (
    <div className="App">
       <GlobalStyles/>
       <RootLayout/>
    </div>
  );
}

export default App;
