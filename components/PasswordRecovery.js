function PasswordRecovery({ onSubmit, onBack }) {
  try {
    const [email, setEmail] = React.useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(email);
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4" data-name="password-recovery" data-file="components/PasswordRecovery.js">
        <div className="card max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[var(--secondary-color)] flex items-center justify-center mx-auto mb-4">
              <div className="icon-key text-4xl text-[var(--primary-color)]"></div>
            </div>
            <h2 className="text-3xl font-bold mb-2">استعادة كلمة المرور</h2>
            <p className="text-[var(--text-secondary)]">أدخل بريدك الإلكتروني لاستعادة كلمة المرور</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              <div className="flex items-center justify-center gap-2">
                <div className="icon-send text-xl"></div>
                <span>إرسال رابط الاستعادة</span>
              </div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] mx-auto"
            >
              <div className="icon-arrow-right text-lg"></div>
              <span>العودة لتسجيل الدخول</span>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PasswordRecovery component error:', error);
    return null;
  }
}