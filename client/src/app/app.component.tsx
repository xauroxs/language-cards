import { Routes, Route, Navigate } from "react-router-dom";

import NotFoundPage from "../pages/not-found/not-found.page";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route
          path="not-found"
          element={<NotFoundPage />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/not-found"
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
