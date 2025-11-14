function Alert({ message }) {
  try {
    return (
      <div 
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce"
        data-name="alert" 
        data-file="components/Alert.js"
      >
        <div className="bg-[var(--success-color)] text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
          <div className="icon-check-circle text-xl"></div>
          <span>{message}</span>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Alert component error:', error);
    return null;
  }
}