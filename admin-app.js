class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">حدث خطأ ما</h1>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              إعادة تحميل
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminApp() {
  try {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [showRecovery, setShowRecovery] = React.useState(false);
    const [servers, setServers] = React.useState([]);
    const [editingServer, setEditingServer] = React.useState(null);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');

    const showAlertMessage = (message) => {
      setAlertMessage(message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    };

    const loadServers = () => {
      try {
        const servers = getServers();
        console.log('Loaded servers:', servers);
        setServers(servers);
      } catch (error) {
        console.error('Error loading servers:', error);
        showAlertMessage('خطأ في تحميل السيرفرات');
      }
    };

    React.useEffect(() => {
      setIsAuthenticated(checkAuth());
      if (checkAuth()) {
        loadServers();
      }
    }, []);

    const handleLogin = (username, password) => {
      if (login(username, password)) {
        setIsAuthenticated(true);
        loadServers();
        showAlertMessage('تم تسجيل الدخول بنجاح');
      } else {
        showAlertMessage('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    };

    const handleLogout = () => {
      logout();
      setIsAuthenticated(false);
    };

    const handleRecovery = (email) => {
      showAlertMessage('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني');
      setShowRecovery(false);
    };

    if (!isAuthenticated) {
      if (showRecovery) {
        return <PasswordRecovery onSubmit={handleRecovery} onBack={() => setShowRecovery(false)} />;
      }
      return <LoginForm onLogin={handleLogin} onForgotPassword={() => setShowRecovery(true)} />;
    }

    const handleSave = (serverData) => {
      try {
        console.log('Saving server data:', serverData);
        if (editingServer) {
          const updated = updateServer(editingServer.objectId, serverData);
          console.log('Server updated:', updated);
          showAlertMessage('تم تحديث السيرفر بنجاح');
        } else {
          const created = createServer(serverData);
          console.log('Server created:', created);
          showAlertMessage('تم إضافة السيرفر بنجاح');
        }
        setEditingServer(null);
        loadServers();
      } catch (error) {
        console.error('Error saving server:', error);
        showAlertMessage('خطأ في حفظ السيرفر: ' + error.message);
      }
    };

    const handleDelete = (serverId) => {
      if (confirm('هل أنت متأكد من حذف هذا السيرفر؟')) {
        try {
          deleteServer(serverId);
          showAlertMessage('تم حذف السيرفر بنجاح');
          loadServers();
        } catch (error) {
          console.error('Error deleting server:', error);
          showAlertMessage('خطأ في حذف السيرفر');
        }
      }
    };

    return (
      <div className="min-h-screen py-12 px-4" data-name="admin-app" data-file="admin-app.js">
        <div className="max-w-6xl mx-auto">
          <AdminHeader onLogout={handleLogout} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-1">
              <ServerForm 
                onSave={handleSave} 
                editingServer={editingServer}
                onCancel={() => setEditingServer(null)}
              />
            </div>
            
            <div className="lg:col-span-2">
              <ServerList 
                servers={servers}
                onEdit={setEditingServer}
                onDelete={handleDelete}
              />
            </div>
          </div>

          {showAlert && <Alert message={alertMessage} />}
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <AdminApp />
  </ErrorBoundary>
);