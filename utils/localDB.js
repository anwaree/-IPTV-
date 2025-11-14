const DB_KEY = 'iptv_servers_db';

function getServers() {
  try {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
      const defaultServers = getDefaultServers();
      saveServers(defaultServers);
      return defaultServers;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading servers:', error);
    const defaultServers = getDefaultServers();
    saveServers(defaultServers);
    return defaultServers;
  }
}

function getDefaultServers() {
  return [
    {
      objectId: '1',
      objectData: {
        m3uUrl: 'http://example.com/playlist1.m3u',
        channels: 150,
        quality: 'HD',
        expiryDate: '١٥ ديسمبر ٢٠٢٥'
      }
    },
    {
      objectId: '2',
      objectData: {
        m3uUrl: 'http://example.com/playlist2.m3u',
        channels: 200,
        quality: 'FHD',
        expiryDate: '٢٠ ديسمبر ٢٠٢٥'
      }
    },
    {
      objectId: '3',
      objectData: {
        m3uUrl: 'http://example.com/playlist3.m3u',
        channels: 300,
        quality: '4K',
        expiryDate: '٢٥ ديسمبر ٢٠٢٥'
      }
    }
  ];
}

function saveServers(servers) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(servers));
    return true;
  } catch (error) {
    console.error('Error saving servers:', error);
    return false;
  }
}

function createServer(serverData) {
  const servers = getServers();
  const newServer = {
    objectId: Date.now().toString(),
    objectData: serverData
  };
  servers.push(newServer);
  saveServers(servers);
  return newServer;
}

function updateServer(serverId, serverData) {
  const servers = getServers();
  const index = servers.findIndex(s => s.objectId === serverId);
  if (index !== -1) {
    servers[index].objectData = serverData;
    saveServers(servers);
    return servers[index];
  }
  return null;
}

function deleteServer(serverId) {
  const servers = getServers();
  const filtered = servers.filter(s => s.objectId !== serverId);
  saveServers(filtered);
  return true;
}