import { useLocation } from "react-router-dom"

export const Page1DetailA = () => {
    const { state } = useLocation();
    console.log(state); // stateの中に配列が渡ってきているのがわかる
    const newArr = state.map((v) => {
        if (v % 2 === 0) {
            return v + ", ";
        }
    })

    return (
        <div>
            <h1>Page1DetailAページです</h1>
            <p>
                { newArr }
            </p>
        </div>
    )
}
