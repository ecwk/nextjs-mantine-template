import { APP_ROUTES } from '../constants/app-routes.constant';
import { IAppRoute } from '../interfaces/app-route.interface';

export const appRoutes: Partial<Record<keyof typeof APP_ROUTES, IAppRoute>> = {
  HOME: {
    label: 'Home',
    path: APP_ROUTES.HOME,
    displayNav: true
  },
  EXAMPLES: {
    label: 'Examples',
    path: APP_ROUTES.EXAMPLES,
    displayNav: true
  },
  LOGIN: {
    label: 'Login',
    path: APP_ROUTES.LOGIN,
    displayNav: (ctx) => ctx.session.status !== 'authenticated'
  },
  PROTECTED: {
    label: 'Protected',
    path: APP_ROUTES.PROTECTED,
    displayNav: true
  },
  ADMIN: {
    label: 'Admin',
    path: APP_ROUTES.ADMIN,
    displayNav: (ctx) => ctx.session.data.user?.role === 'admin'
  }
};
