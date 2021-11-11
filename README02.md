## React Routerのインストール

`$ npm install react-router-dom@5.3.0`<br>

又は<br>

`$ yarn add react-router-dom@5.3.0`<br>

1. `src/Home.jsx`コンポーネントを作成<br>

```
export const Home = () => {
    return (
        <div>
            <h1>Homeページです</h1>
        </div>
    )
}
```

2. `src/Page1.jsx`コンポーネントを作成<br>

```
export const Page1 = () => {
    return (
        <div>
            <h1>Page1ページです</h1>
        </div>
    )
}
```

3. `src/Page2.jsx`コンポーネントを作成<br>

```
export const Page2 = () => {
    return (
        <div>
            <h1>Page2ページです</h1>
        </div>
    )
}
```

`App.js`の編集<br>

```
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'; // ★
import './App.css';
import { Home } from './Home';
import { Page1 } from './Page1';
import { Page2 } from './Page2';

function App() {
  return (
    <BrowserRouter> // ★
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/page1">Page1</Link>
        <br />
        <Link to="/page2">Page2</Link>
      </div>
      <Switch>
        <Route exact path="/"> // exactをつけないとroot配下は全てrootの表示になってしまう
          <Home />
        </Route>
        <Route path="/page1">
          <Page1 />
        </Route>
        <Route path="/page2">
          <Page2 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```
