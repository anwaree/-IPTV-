function ServerDisplay({ serverData, onCopy, serverNumber }) {
  try {
    return (
      <div className="space-y-4" data-name="server-display" data-file="components/ServerDisplay.js">
        <div className="p-6 bg-[var(--secondary-color)] rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)] flex items-center justify-center">
              <span className="text-white font-bold">{serverNumber}</span>
            </div>
            <h3 className="font-bold text-lg">سيرفر رقم {serverNumber}</h3>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-[var(--text-secondary)] mb-1">رابط M3U</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm break-all">{serverData.m3uUrl}</code>
                <button 
                  onClick={() => onCopy(serverData.m3uUrl)}
                  className="btn-success px-3 py-2 rounded-lg"
                >
                  <div className="icon-copy text-lg"></div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-[var(--text-secondary)] mb-1">عدد القنوات</p>
                <p className="text-2xl font-bold text-[var(--primary-color)]">{serverData.channels}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-[var(--text-secondary)] mb-1">الجودة</p>
                <p className="text-2xl font-bold text-[var(--primary-color)]">{serverData.quality}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-[var(--text-secondary)] mb-1">صالح حتى</p>
              <p className="font-medium">{serverData.expiryDate}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ServerDisplay component error:', error);
    return null;
  }
}