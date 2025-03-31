cat > src/amadeus/test-server.ts << EOF
import { AmadeusMcpServer } from "./amadeus-mcp-server.js";
import { StdioServerTransport } from "../server/stdio.js";

async function main() {
  try {
    const server = new AmadeusMcpServer();
    const transport = new StdioServerTransport();
    await server.start(transport);
    console.log("Server started successfully");
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

main();
EOF
