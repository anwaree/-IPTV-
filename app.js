class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">حدث خطأ ما</h1>
            <p className="text-gray-600 mb-4">نأسف، حدث خطأ غير متوقع.</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [serversData, setServersData] = React.useState([]);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [showServers, setShowServers] = React.useState(false);
    const [showAd, setShowAd] = React.useState(false);

    const handleGenerateServer = () => {
      setServersData([]);
      setShowServers(false);
      setShowAd(true);
    };

    const handleCountdownComplete = () => {
      const servers = generate10Servers();
      if (servers && servers.length > 0) {
        setServersData(servers);
        setShowServers(true);
      } else {
        setAlertMessage('لا توجد سيرفرات متاحة حالياً');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    };

    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      setAlertMessage('تم نسخ الرابط بنجاح!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    };

    return (
      <div className="min-h-screen py-12 px-4" data-name="app" data-file="app.js">
        <div className="max-w-4xl mx-auto">
          <Header />
          
          <div className="card mt-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-[var(--secondary-color)] flex items-center justify-center mx-auto mb-4">
                <div className="icon-tv text-4xl text-[var(--primary-color)]"></div>
              </div>
              <h2 className="text-2xl font-bold mb-2">احصل على سيرفر IPTV مجاني</h2>
              <p className="text-[var(--text-secondary)]">انقر على الزر أدناه للحصول على رابط سيرفر جديد</p>
            </div>

            <CountdownButton onGenerate={handleGenerateServer} onComplete={handleCountdownComplete} />

            {showAd && <AdDisplay />}

            {showServers && serversData.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-center mb-4">السيرفرات المتاحة ({serversData.length})</h3>
                {serversData.map((server, index) => (
                  <ServerDisplay key={index} serverData={server} onCopy={handleCopy} serverNumber={index + 1} />
                ))}
              </div>
            )}
          </div>

          {showAlert && <Alert message={alertMessage} />}

          <AdminLink />

          <footer className="text-center mt-12 text-white text-sm">
            <p>© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
          </footer>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);