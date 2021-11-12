import { useParams, useLocation } from "react-router"

export const UrlParameter = () => {
    const { id } = useParams();
    const { search }= useLocation();
    const query = new URLSearchParams(search);
    // console.log(query); // いろいろなメソッドが格納されているのがわかる

    return (
        <div>
            <h1>UrlParameterページです</h1>
            <p>パラメーターは {id} です</p>
            <p>クエリパラメーターは {query.get("name")} です</p>
            {/* "name"は?name=hogehogeのname */}
        </div>
    )
}
