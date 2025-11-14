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

function SettingsApp() {
  try {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [adCode, setAdCode] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [activeTab, setActiveTab] = React.useState('password');

    React.useEffect(() => {
      if (!checkAuth()) {
        window.location.href = 'admin.html';
      }
      setAdCode(getAdCode());
    }, []);

    const showAlertMessage = (message) => {
      setAlertMessage(message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    };

    const handlePasswordSubmit = (e) => {
      e.preventDefault();
      
      if (newPassword !== confirmPassword) {
        showAlertMessage('كلمة المرور الجديدة غير متطابقة');
        return;
      }

      if (newPassword.length < 6) {
        showAlertMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
      }

      if (changePassword(currentPassword, newPassword)) {
        showAlertMessage('تم تغيير كلمة المرور بنجاح');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showAlertMessage('كلمة المرور الحالية غير صحيحة');
      }
    };

    const handleAdSubmit = (e) => {
      e.preventDefault();
      if (saveAdCode(adCode)) {
        showAlertMessage('تم حفظ كود الإعلانات بنجاح');
      } else {
        showAlertMessage('حدث خطأ في حفظ كود الإعلانات');
      }
    };

    return (
      <div className="min-h-screen py-12 px-4" data-name="settings-app" data-file="settings-app.js">
        <div className="max-w-md mx-auto">
          <div className="text-center text-white mb-8">
            <a href="admin.html" className="inline-flex items-center gap-2 hover:opacity-80 mb-6">
              <div className="icon-arrow-right text-xl"></div>
              <span>العودة للوحة التحكم</span>
            </a>
            <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4">
              <div className="icon-key text-4xl text-white"></div>
            </div>
            <h1 className="text-4xl font-bold mb-2">تغيير كلمة المرور</h1>
          </div>

          <div className="card">
            <div className="flex gap-4 mb-6 border-b border-[var(--border-color)]">
              <button
                onClick={() => setActiveTab('password')}
                className={`pb-3 px-4 font-medium transition-colors ${
                  activeTab === 'password'
                    ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                تغيير كلمة المرور
              </button>
              <button
                onClick={() => setActiveTab('ads')}
                className={`pb-3 px-4 font-medium transition-colors ${
                  activeTab === 'ads'
                    ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                إدارة الإعلانات
              </button>
            </div>

            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور الحالية</label>
                  <input
                    type="password"
                    required
                    className="input-field"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    required
                    className="input-field"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    required
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <div className="flex items-center justify-center gap-2">
                    <div className="icon-check text-xl"></div>
                    <span>حفظ التغييرات</span>
                  </div>
                </button>
              </form>
            )}

            {activeTab === 'ads' && (
              <form onSubmit={handleAdSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">كود الإعلانات</label>
                  <textarea
                    className="input-field min-h-[200px] font-mono text-sm"
                    value={adCode}
                    onChange={(e) => setAdCode(e.target.value)}
                    placeholder="الصق كود الإعلانات هنا (HTML/JavaScript)"
                  />
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    سيظهر الإعلان أسفل زر العد التنازلي عند بدء العد
                  </p>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <div className="flex items-center justify-center gap-2">
                    <div className="icon-check text-xl"></div>
                    <span>حفظ كود الإعلانات</span>
                  </div>
                </button>
              </form>
            )}
          </div>

          {showAlert && <Alert message={alertMessage} />}
        </div>
      </div>
    );
  } catch (error) {
    console.error('SettingsApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <SettingsApp />
  </ErrorBoundary>
);