function AdminHeader({ onLogout }) {
  try {
    return (
      <header className="text-center text-white" data-name="admin-header" data-file="components/AdminHeader.js">
        <div className="flex items-center justify-between mb-6">
          <a href="index.html" className="flex items-center gap-2 hover:opacity-80">
            <div className="icon-arrow-right text-xl"></div>
            <span>العودة للرئيسية</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="settings.html" className="flex items-center gap-2 hover:opacity-80">
              <div className="icon-settings text-xl"></div>
              <span>الإعدادات</span>
            </a>
            <button onClick={onLogout} className="flex items-center gap-2 hover:opacity-80">
              <div className="icon-log-out text-xl"></div>
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
        
        <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-6">
          <div className="icon-shield text-5xl text-white"></div>
        </div>
        <h1 className="text-4xl font-bold mb-3">لوحة التحكم</h1>
        <p className="text-lg text-white text-opacity-90">إدارة سيرفرات IPTV</p>
      </header>
    );
  } catch (error) {
    console.error('AdminHeader component error:', error);
    return null;
  }
}