function ServerForm({ onSave, editingServer, onCancel }) {
  try {
    const [formData, setFormData] = React.useState({
      m3uUrl: '',
      channels: '',
      quality: 'HD',
      expiryDays: '30'
    });

    React.useEffect(() => {
      if (editingServer) {
        setFormData({
          m3uUrl: editingServer.objectData.m3uUrl || '',
          channels: String(editingServer.objectData.channels || ''),
          quality: editingServer.objectData.quality || 'HD',
          expiryDays: '30'
        });
      } else {
        setFormData({
          m3uUrl: '',
          channels: '',
          quality: 'HD',
          expiryDays: '30'
        });
      }
    }, [editingServer]);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + parseInt(formData.expiryDays));
      
      onSave({
        m3uUrl: formData.m3uUrl,
        channels: parseInt(formData.channels),
        quality: formData.quality,
        expiryDate: expiryDate.toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
      
      if (!editingServer) {
        setFormData({ m3uUrl: '', channels: '', quality: 'HD', expiryDays: '30' });
      }
    };

    return (
      <div className="card" data-name="server-form" data-file="components/ServerForm.js">
        <h2 className="text-2xl font-bold mb-6">
          {editingServer ? 'تعديل السيرفر' : 'إضافة سيرفر جديد'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">رابط M3U</label>
            <input
              type="url"
              required
              className="input-field"
              value={formData.m3uUrl}
              onChange={(e) => setFormData({...formData, m3uUrl: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">عدد القنوات</label>
            <input
              type="number"
              required
              className="input-field"
              value={formData.channels}
              onChange={(e) => setFormData({...formData, channels: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">الجودة</label>
            <select
              className="input-field"
              value={formData.quality}
              onChange={(e) => setFormData({...formData, quality: e.target.value})}
            >
              <option value="HD">HD</option>
              <option value="FHD">FHD</option>
              <option value="4K">4K</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">مدة الصلاحية (بالأيام)</label>
            <input
              type="number"
              required
              min="1"
              className="input-field"
              value={formData.expiryDays}
              onChange={(e) => setFormData({...formData, expiryDays: e.target.value})}
            />
          </div>
          
          <div className="flex gap-2">
            <button type="submit" className="btn btn-success flex-1">
              {editingServer ? 'تحديث' : 'إضافة'}
            </button>
            {editingServer && (
              <button type="button" onClick={onCancel} className="btn bg-gray-500 text-white">
                إلغاء
              </button>
            )}
          </div>
        </form>
      </div>
    );
  } catch (error) {
    console.error('ServerForm component error:', error);
    return null;
  }
}