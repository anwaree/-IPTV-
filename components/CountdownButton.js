function CountdownButton({ onGenerate, onComplete }) {
  try {
    const [countdown, setCountdown] = React.useState(0);
    const [isDisabled, setIsDisabled] = React.useState(false);

    const handleClick = () => {
      onGenerate();
      setIsDisabled(true);
      setCountdown(30);
    };

    React.useEffect(() => {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 0 && isDisabled) {
        setIsDisabled(false);
        onComplete();
      }
    }, [countdown, isDisabled, onComplete]);

    return (
      <div className="text-center" data-name="countdown-button" data-file="components/CountdownButton.js">
        <button
          onClick={handleClick}
          disabled={isDisabled}
          className={`btn btn-primary text-lg ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="icon-zap text-xl"></div>
            {isDisabled ? `انتظر ${countdown} ثانية` : 'توليد سيرفر جديد'}
          </div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('CountdownButton component error:', error);
    return null;
  }
}