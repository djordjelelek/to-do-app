import "./App.css";
import Layout from "./Layout/Layout";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <main>main</main>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
