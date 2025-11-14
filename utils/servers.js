function generateIPTVServer() {
  try {
    const servers = getServers();
    
    if (servers.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * servers.length);
    const selectedServer = servers[randomIndex];
    
    return {
      m3uUrl: selectedServer.objectData.m3uUrl,
      channels: selectedServer.objectData.channels,
      quality: selectedServer.objectData.quality,
      expiryDate: selectedServer.objectData.expiryDate,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating server:', error);
    return null;
  }
}

function generate10Servers() {
  try {
    const servers = getServers();
    
    if (servers.length === 0) {
      return [];
    }
    
    const result = [];
    const count = Math.min(10, servers.length);
    
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * servers.length);
      const selectedServer = servers[randomIndex];
      
      result.push({
        m3uUrl: selectedServer.objectData.m3uUrl,
        channels: selectedServer.objectData.channels,
        quality: selectedServer.objectData.quality,
        expiryDate: selectedServer.objectData.expiryDate,
        generatedAt: new Date().toISOString()
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error generating servers:', error);
    return [];
  }
}
