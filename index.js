import { DaprServer, DaprClient, CommunicationProtocolEnum } from '@dapr/dapr';

const DAPR_HOST = process.env.DAPR_HOST || "http://localhost";
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || "3501";
const SERVER_HOST = process.env.SERVER_HOST || "127.0.0.1";
const SERVER_PORT = process.env.APP_PORT || 5002;
const PUBSUB_NAME = "solace"

async function main() {
  const server = new DaprServer(SERVER_HOST, SERVER_PORT, DAPR_HOST, DAPR_HTTP_PORT);
    

  // Dapr subscription routes orders topic to this route
  server.pubsub.subscribe(PUBSUB_NAME, "queue://orders-queue", (data) => console.log("Subscriber received: " + JSON.stringify(data)));
 
  await server.start();
  await publish();
}

async function publish(){
  const client = new DaprClient(DAPR_HOST, DAPR_HTTP_PORT, CommunicationProtocolEnum.HTTP);

  for(var i=0;i<5;i++){
    client.pubsub.publish(PUBSUB_NAME, "retail/orders",'{"orderId": "'+i+'"}')
 }

}

main().catch(e => console.error(e));