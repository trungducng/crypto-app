import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import {
  Homepage,
  Cryptocurrencies,
  Exchanges,
  CryptoDetails,
  News,
  Footer,
} from "./components";
import "./App.css";

import { Navbar } from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/cryptocurrencies" component={Cryptocurrencies} />
              <Route path="/exchanges" component={Exchanges} />
              <Route path="/crypto/:coinId" component={CryptoDetails} />
              <Route path="/news" component={News} />
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
