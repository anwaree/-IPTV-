function AdminLink() {
  try {
    return (
      <div className="text-center mt-8" data-name="admin-link" data-file="components/AdminLink.js">
        <a 
          href="admin.html" 
          className="inline-flex items-center gap-2 text-white hover:text-opacity-80 transition-all"
        >
          <div className="icon-settings text-xl"></div>
          <span>لوحة التحكم</span>
        </a>
      </div>
    );
  } catch (error) {
    console.error('AdminLink component error:', error);
    return null;
  }
}