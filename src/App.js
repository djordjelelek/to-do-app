import "./App.css";
import Layout from "./Layout/Layout";
import { BrowserRouter } from "react-router-dom";
// import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          {/* <Header /> */}
          {/* <main>main</main> */}
          <Main />
          <Footer />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
