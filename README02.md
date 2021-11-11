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

## ネストされたページ遷移

`src/Page1DetailA.jsx`コンポーネントを作成<br>

```
export const Page1DetailA = () => {
    return (
        <div>
            <h1>Page1DetailAページです</h1>
        </div>
    )
}
```

`src/Page1DetailB.jsx`コンポーネントを作成<br>

```
export const Page1DetailB = () => {
    return (
        <div>
            <h1>Page1DetailBページです</h1>
        </div>
    )
}
```

`src/Page1.jsx`の編集<br>

```
import { Link } from "react-router-dom"

export const Page1 = () => {
    return (
        <div>
            <h1>Page1ページです</h1>
            <Link to="/page1/detailA">DetailA</Link>
            <br />
            <Link to="/page1/detailB">DetailB</Link>
        </div>
    )
}
```

`App.js`の編集<br>

```
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Page1 } from './Page1';
import { Page1DetailA } from './Page1DetailA'; // 追記
import { Page1DetailB } from './Page1DetailB'; // 追記
import { Page2 } from './Page2';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/page1">Page1</Link>
        <br />
        <Link to="/page2">Page2</Link>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        // ここから編集
        <Route
          path="/page1"
          render={({ match: { url }}) => (
            <Switch>
              {/* {console.log(url)} /page1が取れている*/}
              <Route exact path={url}>
                <Page1 />
              </Route>
              <Route path={`${url}/detailA`}>
                <Page1DetailA />
              </Route>
              <Route path={`${url}/detailB`}>
                <Page1DetailB />
              </Route>
            </Switch>
          )}
        />
        // ここまで編集
        <Route path="/page2">
          <Page2 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```

## ルート定義の分割

`src/router/Router.jsx`コンポーネントを作成<br>

```
import { Switch, Route } from 'react-router-dom';
import { Home } from '../Home';
import { Page1 } from '../Page1';
import { Page1DetailA } from '../Page1DetailA';
import { Page1DetailB } from '../Page1DetailB';
import { Page2 } from '../Page2';

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route
                path="/page1"
                render={({ match: { url } }) => (
            <Switch>
                {/* {console.log(url)} /page1が取れている*/}
                <Route exact path={url}>
                    <Page1 />
                </Route>
                <Route path={`${url}/detailA`}>
                    <Page1DetailA />
                </Route>
                <Route path={`${url}/detailB`}>
                    <Page1DetailB />
                </Route>
            </Switch>
            )}
        />
        <Route path="/page2">
            <Page2 />
        </Route>
        </Switch>
    )
}
```

`App.js`の編集<br>

```
import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import { Router } from './router/Router';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/page1">Page1</Link>
        <br />
        <Link to="/page2">Page2</Link>
      </div>
      <Router />
    </BrowserRouter>
  );
}

export default App;
```

## Page1ページ用のルート定義分割

`src/router/Page1Routes.jsx`コンポーネントの作成<br>

```
import { Page1 } from '../Page1'
import { Page1DetailA } from '../Page1DetailA'
import { Page1DetailB } from '../Page1DetailB'

export const Page1Routes = [
    {
        path: '/',
        exact: true,
        children: <Page1 />,
    },
    {
        path: '/detailA',
        exact: false,
        children: <Page1DetailA />,
    },
    {
        path: '/detailB',
        exact: false,
        children: <Page1DetailB />,
    },
];
```

`App.js`の編集<br>

```
import { Switch, Route } from 'react-router-dom';
import { Home } from '../Home';
import { Page2 } from '../Page2';
import { Page1Routes } from './Page1Routes';

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route
                path="/page1"
                render={({ match: { url } }) => (
            <Switch>
                {Page1Routes.map((route) => (
                    <Route
                        key={route.path}
                        exact={route.exact}
                        path={`${url}${route.path}`}
                    >
                        {route.children}
                    </Route>
                ))}
            </Switch>
            )}
        />
        <Route path="/page2">
            <Page2 />
        </Route>
        </Switch>
    )
}
```