import "./App.css";
import Layout from "./Layout/Layout";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <Header /> */}
        {/* <main>main</main> */}
        <Main />
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
