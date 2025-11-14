function AdDisplay() {
  try {
    const [adHtml, setAdHtml] = React.useState('');

    React.useEffect(() => {
      const code = getAdCode();
      setAdHtml(code);
    }, []);

    React.useEffect(() => {
      if (adHtml) {
        const scripts = document.querySelectorAll('#ad-container script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          if (script.src) {
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          script.parentNode.replaceChild(newScript, script);
        });
      }
    }, [adHtml]);

    if (!adHtml) return null;

    return (
      <div className="mt-6" data-name="ad-display" data-file="components/AdDisplay.js">
        <div 
          id="ad-container"
          className="p-4 bg-white bg-opacity-10 rounded-lg"
          dangerouslySetInnerHTML={{ __html: adHtml }}
        />
      </div>
    );
  } catch (error) {
    console.error('AdDisplay component error:', error);
    return null;
  }
}