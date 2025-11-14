function Header() {
  try {
    return (
      <header className="text-center text-white" data-name="header" data-file="components/Header.js">
        <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-6">
          <div className="icon-radio text-5xl text-white"></div>
        </div>
        <h1 className="text-5xl font-bold mb-4">سيرفرات IPTV المجانية</h1>
        <p className="text-xl text-white text-opacity-90 max-w-2xl mx-auto">
          احصل على روابط سيرفرات IPTV مجانية وموثوقة لمشاهدة قنواتك المفضلة
        </p>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}