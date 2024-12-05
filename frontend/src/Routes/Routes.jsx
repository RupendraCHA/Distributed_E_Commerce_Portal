import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  privateRoutes,
  publicRoutes,
  pirvateSections,
  Products,
} from "./routesData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import "./routes.css"
function RoutesComponent() {
  // Accessing the logged-in state from the Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
    <div className="app-container">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <main className="main-content">
          <Routes>
              {publicRoutes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
              {isLoggedIn && (
                <>
                  {privateRoutes.map(({ path, element: Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                  ))}
                  {pirvateSections.map(({ path, data, section }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <Products
                          iterationData={data}
                          currentSection={section}
                        />
                      }
                    />
                  ))}
                </>
              )}
          </Routes>
        </main>
      </Suspense>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default RoutesComponent;
