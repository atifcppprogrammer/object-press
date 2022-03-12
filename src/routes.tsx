import React, { useContext, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import {
  LOGIN,
  POSTS,
  GALLERY,
  DASHBOARD,
  BLOGS,
  UPDATE_POSTS,
  NEW_BLOG,
  UPDATE_BLOG,
  UPLOAD,
  NEW_POST,
  SETTINGS,
  PROFILE,
  CREDS,
} from 'settings/constants';
import AuthProvider, { AuthContext } from 'context/auth';
import { InLineLoader } from 'components/InlineLoader/InlineLoader';
const Settings = lazy(() => import('containers/Settings/Settings'));
const Gallery = lazy(() => import('containers/Gallery/Gallery'));
const AdminLayout = lazy(() => import('containers/Layout/Layout'));
const Dashboard = lazy(() => import('containers/Dashboard/Dashboard'));
const Posts = lazy(() => import('containers/Posts/Posts'));
const Blogs = lazy(() => import('containers/Blogs/Blogs'));
const Login = lazy(() => import('containers/Login/Login'));
const NotFound = lazy(() => import('containers/NotFound/NotFound'));

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation()
    .pathname.split('/')[1]
    .replace(/(\/)|[0-9]|[-]/g, ' ');

  return (
    <>
      <Helmet>
        <title>
          {`${location.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          )} | Object Press`}
        </title>
      </Helmet>

      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location.pathname },
              }}
            />
          )
        }
      />
    </>
  );
}

const Routes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <PrivateRoute exact={true} path={DASHBOARD}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Dashboard />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={POSTS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Posts />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={NEW_POST}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Posts />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={UPDATE_POSTS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Posts />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={GALLERY}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Gallery />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={UPLOAD}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Gallery />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={BLOGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Blogs />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={NEW_BLOG}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Blogs />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={UPDATE_BLOG}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Blogs />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Settings />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={PROFILE}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Settings />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={CREDS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Settings />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <Route path={LOGIN}>
            <Suspense fallback={<InLineLoader />}>
              <Login /> <Redirect from="/" to="/" />
            </Suspense>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export default Routes;
