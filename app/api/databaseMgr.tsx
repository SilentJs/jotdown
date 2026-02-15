'use server'
import { Client } from 'cassandra-driver'

const client = new Client({
    contactPoints: ['0.tcp.in.ngrok.io'],
    localDataCenter: 'datacenter1',
    keyspace: 'jotdown',
    protocolOptions: {port: 14313}
  });
  async function connectToCassandra() {
    try {
      await client.connect();
      console.log('Connected to Cassandra');
  
      // Your Cassandra operations here
  
    } catch (error) {
      console.error('Error connecting to Cassandra:', error);
    } finally {
      await client.shutdown();
      console.log('Connection closed');
    }
  }