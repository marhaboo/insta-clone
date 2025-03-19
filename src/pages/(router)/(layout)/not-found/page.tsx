import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-screen text-center">
      <h1 className="mb-6 font-bold text-3xl">Instagram</h1>

      <h2 className="font-semibold text-xl">
        К сожалению, эта страница недоступна.
      </h2>
      <p className="mt-2 text-gray-500">
        Возможно, вы воспользовались недействительной ссылкой или страница была
        удалена.
      </p>

      <Link href="/" className="mt-4 font-semibold text-blue-500">
        Назад в Instagram.
      </Link>

      <footer className="mt-10 text-gray-400 text-sm">
        Meta • Информация • Блог • Вакансии • API • Условия • Instagram Lite
      </footer>
    </div>
  );
};

export default NotFoundPage;
