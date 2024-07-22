// import { createConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { http, createConfig, webSocket } from "wagmi";
import { createClient } from "viem";

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [injected()],
    transports: {
        [mainnet.id]: webSocket(
            "wss://mainnet.infura.io/ws/v3/bb6d8d62fdf0452997fba608e9999ecc"
        ),
        [sepolia.id]: webSocket(
            "wss://sepolia.infura.io/ws/v3/bb6d8d62fdf0452997fba608e9999ecc"
        ),
    },
});
