import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { PrivateOutlet } from './Guard';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to="/login" />,
	},
	{
		path: '/login',
		async lazy() {
			const { default: LoginLayout } = await import('../modules/auth/sign-in/view/index');
			return { element: <LoginLayout /> };
		},
	},
	{
		path: '/sign-up',
		async lazy() {
			const { default: SignUpLayout } = await import('../modules/auth/sign-up/view/index');
			return { element: <SignUpLayout /> };
		},
	},
	{
		path: '/home',
		async lazy() {
			const { default: HomeLayout } = await import('../modules/dashboard/home/view/index');
			return {
				element: <PrivateOutlet>{<HomeLayout />}</PrivateOutlet>,
			};
		},
	},
	{
		path: '/empleado',
		async lazy() {
			const { default: EmpleadoLayout } = await import('../modules/dashboard/empleado/view/index');
			return {
				element: <PrivateOutlet>{<EmpleadoLayout />}</PrivateOutlet>,
			};
		},
	},
];
export default createBrowserRouter(routes);

/*
// Carga perezosa con nombres definidos
const LoginLayout = React.lazy(() => import('../modules/auth/sign-in/view/index'));
const SignUpLayout = React.lazy(() => import('../modules/auth/sign-up/view/index'));
const HomeLayout = React.lazy(() => import('../modules/dashboard/empleado/view/index'));

const routes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginLayout />
      </Suspense>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpLayout />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateOutlet>
          <HomeLayout />
        </PrivateOutlet>
      </Suspense>
    ),
  },
];

export default createBrowserRouter(routes);

*/
