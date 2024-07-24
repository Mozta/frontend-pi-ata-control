import mqtt from 'mqtt';

export const connectMQTT = (onConnect, onFailure) => {
  const client = mqtt.connect('wss://mqtt.eclipseprojects.io:443/mqtt');

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    onConnect(client);
  });

  client.on('error', (err) => {
    console.error('Failed to connect to MQTT broker', err);
    onFailure(err);
  });

  return client;
};