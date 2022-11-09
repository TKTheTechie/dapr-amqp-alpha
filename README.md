# DAPR AMQP ALPHA

This is an alpha candidate version of the DAPRD distro with the ability to connect to amqp 1.0

## Installation instructions

1. Install the DAPR cli following instructions [here](https://docs.dapr.io/getting-started/install-dapr-cli/) and run `dapr init` to download the dapr binaries
2. Determine the location of where DAPRD is installed by running `where daprd`
3. Make a backup of the above daprd and copy [daprd/daprd](/daprd/daprd) to the above mentioned locations
4. Modify the connection details in [/components/amqp.yaml](components/amqp.yaml) to match your enviornment
5. The test program publishes to the topic retail/orders and consumes messages from an orders-queue (ensure the queue is pre-provisioned and the topic to queue mapping is set appropriately)
6. Run the following command `dapr run --app-id checkout --app-protocol http --dapr-http-port 3501 --app-port 5002  --components-path ./components -- npm run start` to start DAPR and the application
   
