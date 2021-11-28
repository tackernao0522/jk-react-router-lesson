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
import { Page1DetailA } from './Page1DetailA';
import { Page1DetailB } from './Page1DetailB';
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
        <Route
          path="/page1"
          render={() => (
          <Switch>
            <Route exact path="/page1">
              <Page1 />
            </Route>
            <Route path="/page1/detailA">
              <Page1DetailA />
            </Route>
            <Route path="/page1/detailB">
              <Page1DetailB />
            </Route>
          </Switch>
        )} />
        <Route path="/page2">
          <Page2 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```

ここまでで遷移するが...<br>

`App.js`を編集再度編集 (より確実な/page1は以下とする為)<br>

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
          // render関数はデフォルトでpropsを受け取っていてその中にはmatchプロパティが含まれていてその中のurlにpage1が入っている
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

## URLパラメータを使う

`src/UrlParameter.jsx`コンポーネントを作成<br>

```
import { useParams } from "react-router-dom"

export const UrlParameter = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>UrlParameterページです</h1>
            <p>パラメーターは {id} です</p>
        </div>
    )
}
```

`src/router/Page2Routes.jsx`コンポーネントを作成<br>

```
import { Page2 } from '../Page2';
import { UrlParameter } from '../UrlParameter';

export const Page2Routes = [
    {
        path: '/',
        exact: true,
        children: <Page2 />,
    },
    {
        path: '/:id',
        exact: false,
        children: <UrlParameter />,
    },
];
```

`src/Page2.jsx`の編集<br>

```
import { Link } from "react-router-dom"

export const Page2 = () => {
    return (
        <div>
            <h1>Page2ページです</h1>
            <Link to="/page2/100">URL Parameter</Link>
        </div>
    )
}
```

+ `src/router/Router.jsx`を編集<br>

```
import { Route, Switch } from 'react-router'
import { Home } from '../Home'
import { Page1Routes } from './Page1Routes'
import { Page2Routes } from './Page2Routes'

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route
        path="/page1"
        render={({ match: { url } }) => {
          return (
            <Switch>
              {Page1Routes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    exact={route.exact}
                    path={`${url}${route.path}`}
                  >
                    {route.children}
                  </Route>
                )
              })}
            </Switch>
          )
        }}
      />
      <Route
        path="/page2"
        render={({ match: { url } }) => {
          return (
            <Switch>
              {Page2Routes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    exact={route.exact}
                    path={`${url}${route.path}`}
                  >
                    {route.children}
                  </Route>
                )
              })}
            </Switch>
          )
        }}
      ></Route>
    </Switch>
  )
}
```

## クエリパラメータ

`src/page2.jsx`の編集<br>

```
import { Link } from "react-router-dom"

export const Page2 = () => {
    return (
        <div>
            <h1>Page2ページです</h1>
            <Link to="/page2/999">URL Parameter</Link>
            <br />
            <Link to="/page2/999?name=hogehoge">Query Parameter</Link> // 追記
        </div>
    )
}
```

`src/UrlParameter.jsx`の編集<br>

```
import { useParams, useLocation } from "react-router" // 編集

export const UrlParameter = () => {
    // ここから追記
    const { id } = useParams();
    const { search }= useLocation();
    const query = new URLSearchParams(search);
    // console.log(query); // いろいろなメソッドが格納されているのがわかる
    // ここまで追記

    return (
        <div>
            <h1>UrlParameterページです</h1>
            <p>パラメーターは {id} です</p>
            <p>クエリパラメーターは {query.get("name")} です</p> // 追記
            {/* "name"は?name=hogehogeのname */}
        </div>
    )
}
```

## stateを渡すページ遷移

`src/Page1.jsx`の編集<br>

```
import { Link } from "react-router-dom"

export const Page1 = () => {
    const arr = [...Array(100).keys()]; // 100件の配列にしてみる
    // console.log(arr);
    return (
        <div>
            <h1>Page1ページです</h1>
            <Link to={{ pathname: "/page1/detailA", state: arr }}>DetailA</Link>
            <br />
            <Link to="/page1/detailB">DetailB</Link>
        </div>
    )
}
```

`src/Page1DetailA.jsx`の編集<br>

```
import { useLocation } from "react-router-dom"

export const Page1DetailA = () => {
    const { state } = useLocation();
    console.log(state); // stateの中に配列が渡ってきているのがわかる

    return (
        <div>
            <h1>Page1DetailAページです</h1>
        </div>
    )
}
```
## Linkを使わないページ遷移 (JavaScript側でページ遷移する方法) 使用頻度高い

`src/Page1.jsx`の編集<br>

```
import { Link, useHistory } from "react-router-dom" // 編集

export const Page1 = () => {
    const arr = [...Array(100).keys()]; // 100件の配列にしてみる
    // console.log(arr);
    const history = useHistory(); // 追記

    const onClickDetailA = () => history.push("/page1/detailA") // 追記

    return (
        <div>
            <h1>Page1ページです</h1>
            <Link to={{ pathname: "/page1/detailA", state: arr }}>DetailA</Link>
            <br />
            <Link to="/page1/detailB">DetailB</Link>
            <br />
            <button onClick={onClickDetailA}>DetailA</button> // 追記
        </div>
    )
}
```

`src/Page1Detail.jsx`の編集<br>

```
import { useLocation, useHistory } from "react-router-dom" // 編集

export const Page1DetailA = () => {
    const { state } = useLocation();
    console.log(state); // stateの中に配列が渡ってきているのがわかる

    const history = useHistory(); // 追記
    const onClickBack = () => history.goBack(); // 追記

    return (
        <div>
            <h1>Page1DetailAページです</h1>
            <button onClick={onClickBack}>戻る</button> // 追記
        </div>
    )
}
```

## 404ページを用意

`src/Page404.jsx`コンポーネントを作成<br>

```
import { Link } from "react-router-dom"

export const Page404 = () => {
    return (
        <div>
            <h1>ページが見つかりません</h1>
            <Link to="/">TOPに戻る</Link>
        </div>
    )
}
```

`src/router/Router.jsx`を編集<br>

```
import { Switch, Route } from 'react-router-dom';
import { Home } from '../Home';
import { Page404 } from '../Page404';
import { Page1Routes } from './Page1Routes';
import { Page2Routes } from './Page2Routes';

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
        <Route
                path="/page2"
                render={({ match: { url } }) => (
            <Switch>
                {Page2Routes.map((route) => (
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
        <Route path="*"> // URLパラメータを設定してないURLが指定された場合は404ページに遷移する
            <Page404 />
        </Route>
        </Switch>
    )
}
```
