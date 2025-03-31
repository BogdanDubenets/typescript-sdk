import { McpServer } from "../server/mcp.js";
import { Transport } from "../shared/transport.js";
import Amadeus from "amadeus";
import { AmadeusConfig, loadAmadeusConfig } from "../config/amadeus.js";

/**
 * AmadeusMcpServer - Wrapper around Amadeus API using Model Context Protocol
 * Provides standardized access to Amadeus travel APIs through MCP
 */
export class AmadeusMcpServer {
  /** The underlying MCP server instance */
  public readonly server: McpServer;
  
  /** The Amadeus API client */
  private readonly amadeus: Amadeus;
  
  /**
   * Creates a new Amadeus MCP Server
   * 
   * @param options - Configuration options for Amadeus API
   */
  constructor(options: Partial<AmadeusConfig> = {}) {
    // Initialize the MCP server
    this.server = new McpServer({
      name: "Amadeus MCP Server",
      version: "1.0.0"
    });

    // Load config from environment variables and merge with provided options
    const config = {
      ...loadAmadeusConfig(),
      ...options
    };

    // Initialize the Amadeus client
    this.amadeus = new Amadeus({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      hostname: config.hostname,
      logger: config.logger,
      logLevel: config.logLevel
    });

    // Register MCP capabilities
    this.server.registerCapabilities({
      resources: {},
      tools: {},
      prompts: {}
    });
  }

  /**
   * Register Amadeus API resources
   * This method will be implemented in the next steps
   */
  registerResources(): void {
    // To be implemented
  }

  /**
   * Register Amadeus API tools
   * This method will be implemented in the next steps
   */
  registerTools(): void {
    // To be implemented
  }

  /**
   * Register Amadeus API prompts
   * This method will be implemented in the next steps
   */
  registerPrompts(): void {
    // To be implemented
  }

  /**
   * Start the MCP server with the specified transport
   * 
   * @param transport - Transport for the server (optional)
   */
  async start(transport?: Transport): Promise<void> {
    // Register all capabilities
    this.registerResources();
    this.registerTools();
    this.registerPrompts();
    
    // Connect to the provided transport or let the caller connect manually
    if (transport) {
      await this.server.connect(transport);
      console.log("Amadeus MCP Server started");
    }
  }

  /**
   * Get the Amadeus client instance
   * This provides access to the underlying Amadeus SDK
   */
  getAmadeusClient(): Amadeus {
    return this.amadeus;
  }
}
