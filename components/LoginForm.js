function LoginForm({ onLogin, onForgotPassword }) {
  try {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(username, password);
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4" data-name="login-form" data-file="components/LoginForm.js">
        <div className="card max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[var(--secondary-color)] flex items-center justify-center mx-auto mb-4">
              <div className="icon-lock text-4xl text-[var(--primary-color)]"></div>
            </div>
            <h2 className="text-3xl font-bold mb-2">تسجيل الدخول</h2>
            <p className="text-[var(--text-secondary)]">لوحة التحكم - إدارة السيرفرات</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">اسم المستخدم</label>
              <input
                type="text"
                required
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <input
                type="password"
                required
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              <div className="flex items-center justify-center gap-2">
                <div className="icon-log-in text-xl"></div>
                <span>دخول</span>
              </div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={onForgotPassword}
              className="text-[var(--primary-color)] hover:underline text-sm"
            >
              نسيت كلمة المرور؟
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginForm component error:', error);
    return null;
  }
}