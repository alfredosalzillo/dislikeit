import React, {
  createContext, useContext, useState,
} from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

type Severity = 'success' | 'info' | 'warning' | 'error';
type Notification = {
  severity: Severity,
  message: string,
};
type NotificationsContextValue = {
  notification: Notification,
  showNotification: (notification: Notification) => void,
};
const NotificationsContext = createContext<NotificationsContextValue>(null);

export const useNotifications = () => useContext(NotificationsContext);

export type NotificationsProps = React.PropsWithChildren<{}>;
const Notifications: React.FC<NotificationsProps> = ({ children }) => {
  const [notification, setNotification] = useState<Notification>(null);
  const [open, setOpen] = useState(false);
  const closeNotification = () => setOpen(false);
  return (
    <NotificationsContext.Provider
      value={{
        notification,
        showNotification: (value) => {
          setOpen(true);
          setNotification(value);
        },
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeNotification}
      >
        <Alert onClose={closeNotification} severity={notification?.severity}>
          {notification?.message}
        </Alert>
      </Snackbar>
    </NotificationsContext.Provider>
  );
};

export default Notifications;
