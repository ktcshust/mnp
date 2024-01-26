// App.js
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import FashionList from './components/FashionList';
import FashionDetail from './components/FashionDetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={SignIn} />
        <Route exact path="/fashion" render={() => <FashionList fashionItems={fashionItems} />} />
        <Route path="/fashion/:id" render={(props) => <FashionDetail {...props} fashionItems={fashionItems} />} />
      </Switch>
    </Router>
  );
};

export default App;
