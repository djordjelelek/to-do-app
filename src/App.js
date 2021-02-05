import "./App.css";
import Layout from "./Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthContext/AuthContext";
// import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <AuthProvider>
            {/* <Header /> */}
            <Main />
            <Footer />
          </AuthProvider>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
