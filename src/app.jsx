/* eslint-disable perfectionist/sort-imports */
import { useEffect, useLayoutEffect } from 'react';
import { getToken } from './utils/utils';
import { useRouter } from 'src/routes/hooks';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  useScrollToTop();
  useEffect(() => {
    (() => {
      try {
        const token = getToken();

        if (!token || token === undefined) {
          console.log('load', token);

          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    })();
  }, []);
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
