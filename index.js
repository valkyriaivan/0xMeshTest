const Web3 = require("web3");
const orderUtils = require("@0x/order-utils");

const websocketProvider = new Web3.providers.WebsocketProvider(
  "ws://localhost:8080"
);

websocketProvider
  .sendPayload({
    jsonrpc: "2.0",
    method: "mesh_subscribe",
    params: ["orders"],
    id: 1
  })
  .then(function(response) {
    console.log(response);
  });

websocketProvider.subscribe("mesh_subscribe", "orders", []);

var order = orderUtils.orderParsingUtils.convertOrderStringFieldsToBigNumber({
  exchangeAddress: "0x4530c0483a1633c7a1c97d2c53721caff2caaaaf",
  makerAddress: "0x8cff49b26d4d13e0601769f8a60fd697b713b9c6",
  takerAddress: "0x0000000000000000000000000000000000000000",
  senderAddress: "0x0000000000000000000000000000000000000000",
  feeRecipientAddress: "0x0000000000000000000000000000000000000000",
  expirationTimeSeconds: "1559826927",
  salt:
    "48128453606684653105952683301312821720867493716494911784363103883716429240740",
  makerAssetAmount: "100000000000000000",
  takerAssetAmount: "1000000000000000000",
  takerAssetData:
    "0xf47261b0000000000000000000000000ff67881f8d12f372d91baae9752eb3631ff0ed00",
  makerAssetData:
    "0xf47261b0000000000000000000000000c778417e063141139fce010982780140aa0cd5ab",
  makerFee: "0",
  takerFee: "0",
  signature:
    "0x1cf5839d9a0025e684c3663151b1db14533cc8c9e495fb92543a37a7fffc0677a23f3b6d66a1f56d3fda46eb5277b4a91c7b7faad4fdaaa5aac9a1185dd545a8a002"
});

websocketProvider
  .sendPayload({
    jsonrpc: "2.0",
    id: 2,
    method: "mesh_addOrders",
    params: [[order]]
  })
  .then(function(response) {
    console.log(response);
  })
