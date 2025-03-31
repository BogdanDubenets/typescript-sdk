/**
 * Amadeus API configuration
 */
export interface AmadeusConfig {
  /** Amadeus API client ID */
  clientId: string;
  /** Amadeus API client secret */
  clientSecret: string;
  /** API environment: 'test' or 'production' */
  hostname?: 'test' | 'production';
  /** Custom logger instance */
  logger?: Console;
  /** Log level: 'silent', 'warn', or 'debug' */
  logLevel?: 'silent' | 'warn' | 'debug';
}

/**
 * Load Amadeus configuration from environment variables
 */
export function loadAmadeusConfig(): AmadeusConfig {
  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error(
      'Amadeus API credentials not found. ' +
      'Set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET environment variables.'
    );
  }
  
  return {
    clientId,
    clientSecret,
    hostname: (process.env.AMADEUS_HOSTNAME || 'test') as 'test' | 'production',
    logLevel: (process.env.AMADEUS_LOG_LEVEL || 'silent') as 'silent' | 'warn' | 'debug'
  };
}
