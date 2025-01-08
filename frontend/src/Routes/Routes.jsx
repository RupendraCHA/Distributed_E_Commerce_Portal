import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  privateRoutes,
  publicRoutes,
  pirvateSections,
  Products,
  adminRoutes,
} from './routesData.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import './routes.css';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.user?.role);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function RoutesComponent() {
  // Accessing the logged-in state from the Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.user?.role);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Suspense
          fallback={
            <div className="loading-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              {publicRoutes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}

              {/* Protected Routes */}
              {isLoggedIn && (
                <>
                  {/* Private Routes */}
                  {privateRoutes.map(({ path, element: Element }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <ProtectedRoute>
                          <Element />
                        </ProtectedRoute>
                      }
                    />
                  ))}

                  {/* Product Section Routes */}
                  {pirvateSections.map(({ path, data, section }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <ProtectedRoute>
                          <Products
                            iterationData={data}
                            currentSection={section}
                          />
                        </ProtectedRoute>
                      }
                    />
                  ))}

                  {/* Admin Routes */}
                  {userRole === 'admin' &&
                    adminRoutes.map(({ path, element: Element }) => (
                      <Route
                        key={path}
                        path={path}
                        element={
                          <ProtectedRoute requireAdmin>
                            <Element />
                          </ProtectedRoute>
                        }
                      />
                    ))}
                </>
              )}

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
    // <BrowserRouter>
    //   <div className="app-container">
    //     <Header />
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <main className="main-content">
    //         <Routes>
    //           {publicRoutes.map(({ path, element: Element }) => (
    //             <Route key={path} path={path} element={<Element />} />
    //           ))}
    //           {isLoggedIn && (
    //             <>
    //               {privateRoutes.map(({ path, element: Element }) => (
    //                 <Route key={path} path={path} element={<Element />} />
    //               ))}
    //               {pirvateSections.map(({ path, data, section }) => (
    //                 <Route
    //                   key={path}
    //                   path={path}
    //                   element={
    //                     <Products
    //                       iterationData={data}
    //                       currentSection={section}
    //                     />
    //                   }
    //                 />
    //               ))}
    //             </>
    //           )}
    //         </Routes>
    //       </main>
    //     </Suspense>
    //     <Footer />
    //   </div>
    // </BrowserRouter>
  );
}

export default RoutesComponent;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requireAdmin: PropTypes.bool,
};
