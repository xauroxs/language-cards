import { useNavigate } from "react-router-dom";

import Lost from "../../assets/lost.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-100 dark:bg-black">
      <div className="h-72 w-72">
        <img src={Lost} alt="lost person" />
      </div>
      <h2 className="mb-2 text-4xl font-bold dark:text-slate-100">Not Found</h2>
      <p className="mb-2 text-lg dark:text-slate-100">Where am I?</p>
      <button
        className="flex h-12 items-center justify-center rounded-xl bg-sky-500 p-4 text-lg text-white transition hover:bg-sky-600"
        onClick={() => navigate("/")}
      >
        Teleport Home
      </button>
    </div>
  );
};

export default NotFoundPage;
