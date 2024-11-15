import { useLocation, useHistory } from "react-router-dom"

export const Page1DetailA = () => {
    const { state } = useLocation();
    console.log(state); // stateの中に配列が渡ってきているのがわかる

    const history = useHistory();
    const onClickBack = () => history.goBack();

    return (
        <div>
            <h1>Page1DetailAページです</h1>
            <button onClick={onClickBack}>戻る</button>
        </div>
    )
}
