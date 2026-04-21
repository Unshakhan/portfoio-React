import { createContext, useContext, useState, useCallback } from 'react';

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ title, message, type = 'success' }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3500);
  }, []);

  const remove = (id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  };

  const iconMap = {
    success: 'fa-solid fa-circle-check',
    warning: 'fa-solid fa-triangle-exclamation',
    error: 'fa-solid fa-circle-xmark',
    info: 'fa-solid fa-circle-info',
  };

  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast toast-${t.type}${t.removing ? ' removing' : ''}`}
          >
            <i className={`toast-icon ${iconMap[t.type] || iconMap.info}`}></i>
            <div style={{ flex: 1 }}>
              {t.title && <div className="toast-title">{t.title}</div>}
              <div
                className="toast-msg"
                dangerouslySetInnerHTML={{ __html: t.message }}
              />
            </div>
            <button className="toast-close" onClick={() => remove(t.id)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}