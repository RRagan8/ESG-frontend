import 'chart.js/auto';
import 'dayjs/locale/ru';
import React from 'react';
import dayjs from 'dayjs';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './modules/router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useEffect, useState} from "react"
import {FrontendApi, Configuration, Session, Identity} from "@ory/client"
import { Button, Typography, Box, Paper } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const basePath = process.env.REACT_APP_ORY_URL || "http://localhost:4000"
const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  }),
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  const [session, setSession] = useState<Session | undefined>();
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>();

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        setSession(data);
        return ory.createBrowserLogoutFlow();
      })
      .then(({ data }) => {
        setLogoutUrl(data.logout_url);
      })
      .catch((err) => {
        console.error('Session or logout flow error:', err);
        window.location.replace(`${basePath}/ui/login`);
      });
  }, []);

  if (!session) {
    return <h1>Loading...</h1>;
  }

  const handleLogout = () => {
    if (logoutUrl) {
      window.location.href = logoutUrl;
    } else {
      console.error('Logout URL is undefined.');
    }
  };

  dayjs.locale('ru');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1000 }}>
            <Paper sx={{ padding: 0.3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', backgroundColor: '#f7f7f7' }}>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                {session.identity ? `${session.identity.traits.email}` : "Loading..."}
              </Typography>
              <Button variant="outlined" size="small" onClick={handleLogout} sx={{ textTransform: 'none' }}>
                Logout
              </Button>
            </Paper>
          </Box>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
