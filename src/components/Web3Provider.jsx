import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, sepolia } from 'viem/chains';
import { CONFIGS } from "../contract/constants";

const chains = CONFIGS.mainnet ? mainnet : sepolia;

const config = createConfig(
  getDefaultConfig({
    chains: [chains],
    transports: {
      [chains.id]: http(
        CONFIGS.provider
      )
    },
    walletConnectProjectId: CONFIGS.walletConnectProjectId,
    appName: 'Karma',
    enableFamily: false
  })
)

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          mode='light'
          options={{
            language: 'en-US',
            customAvatar: Avatar
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const Avatar = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#F0F0F0' }}>
      <img src='/images/logo.png' alt="karma-logo" loading="lazy" />
    </div>
  )
}