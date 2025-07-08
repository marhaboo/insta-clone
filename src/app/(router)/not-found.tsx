import Link from "next/link";


export default function NotFound() {
    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>Страница не найдена</h1>
            <p>Извините, страница, которую вы ищете, не существует.</p>
            <Link href="/">Вернуться на главную</Link>
        </div>
    )
}
