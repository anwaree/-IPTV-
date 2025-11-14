const AD_CODE_KEY = 'iptv_ad_code';

function saveAdCode(adCode) {
  try {
    localStorage.setItem(AD_CODE_KEY, adCode);
    return true;
  } catch (error) {
    console.error('Error saving ad code:', error);
    return false;
  }
}

function getAdCode() {
  try {
    return localStorage.getItem(AD_CODE_KEY) || '';
  } catch (error) {
    console.error('Error getting ad code:', error);
    return '';
  }
}

function clearAdCode() {
  try {
    localStorage.removeItem(AD_CODE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing ad code:', error);
    return false;
  }
}