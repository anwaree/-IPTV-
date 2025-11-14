function ServerList({ servers, onEdit, onDelete }) {
  try {
    return (
      <div className="card" data-name="server-list" data-file="components/ServerList.js">
        <h2 className="text-2xl font-bold mb-6">قائمة السيرفرات ({servers.length})</h2>
        
        <div className="space-y-4">
          {servers.length === 0 ? (
            <p className="text-center text-[var(--text-secondary)] py-8">
              لا توجد سيرفرات حالياً
            </p>
          ) : (
            servers.map((server) => (
              <div key={server.objectId} className="p-4 bg-[var(--secondary-color)] rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-[var(--text-secondary)] mb-1">رابط M3U</p>
                    <code className="text-sm break-all">{server.objectData.m3uUrl}</code>
                  </div>
                  <div className="flex gap-2 mr-3">
                    <button
                      onClick={() => onEdit(server)}
                      className="p-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90"
                    >
                      <div className="icon-edit text-lg"></div>
                    </button>
                    <button
                      onClick={() => onDelete(server.objectId)}
                      className="p-2 bg-[var(--danger-color)] text-white rounded-lg hover:opacity-90"
                    >
                      <div className="icon-trash-2 text-lg"></div>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">القنوات</p>
                    <p className="font-bold">{server.objectData.channels}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">الجودة</p>
                    <p className="font-bold">{server.objectData.quality}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">الانتهاء</p>
                    <p className="font-bold text-xs">{server.objectData.expiryDate}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ServerList component error:', error);
    return null;
  }
}