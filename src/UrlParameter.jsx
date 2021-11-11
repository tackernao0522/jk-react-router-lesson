import { useParams } from "react-router"

export const UrlParameter = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>UrlParameterページです</h1>
            <p>パラメーターは {id} です</p>
        </div>
    )
}
