import '../styles/globals.css';
import Layout from '../components/Layout';
// import '@rainbow-me/rainbowkit/styles.css';
// import {
//   RainbowKitProvider,
//   getDefaultWallets,
//   midnightTheme,
//   lightTheme,
// } from '@rainbow-me/rainbowkit';
// import {
//   chain,
//   configureChains,
//   createClient,
//   WagmiConfig,
//   wagmiConfig,
// } from 'wagmi';
// import { publicProvider } from 'wagmi/providers/public';

// const { chains, provider } = configureChains(
//   [chain.polygonMumbai],
//   [publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: 'Pawsitive',
//   chain,
// });

// const wagmiClient = createClient({
//   connectors,
//   provider,
// });

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
