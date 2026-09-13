import type { RouteObject } from 'react-router-dom';
import Layout from '@/layout/Layout';

import Home from '@/features/home/Home';
import About from '@/features/about/About';
import Services from '@/features/services/Services';
import ServiceDetail from '@/features/services/ServiceDetail';
import Team from '@/features/team/Team';
import Blog from '@/features/blog/Blog';
import Locations from '@/features/locations/Locations';
import Contact from '@/features/contact/Contact';
import Privacy from '@/features/privacy/Privacy';
import Terms from '@/features/terms/Terms';
import NotFound from '@/features/notfound/NotFound';

export const AppRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'team', element: <Team /> },
      { path: 'blog', element: <Blog /> },
      { path: 'locations', element: <Locations /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];