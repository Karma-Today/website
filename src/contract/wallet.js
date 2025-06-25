import { ethers } from 'ethers';
import { CONFIGS } from './constants';
import { useEffect, useRef, useState } from 'react';

export const useWallet = () => {
    const [account, setAccount] = useState(null);
    const providerRef = useRef(null);

    const initWallet = async() => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum)
            providerRef.current = provider
            
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
                setAccount(accounts[0].address);
                initEvent();
            }
        } else {
            console.log('Non-Ethereum browser detected.')
        }
    }

    const switchNetwork = async (ethereum) => {
        const chainId = CONFIGS.chainId.toString(16);
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
                { chainId: `0x${chainId}` }
            ]
        })
    }

    const connectWallet = async () => {
        if (!providerRef.current) {
            window.location.href = 'https://metamask.io/download'
            return;
        }

        try {
            const { chainId } = await providerRef.current.getNetwork();
            console.log(chainId)
            if (chainId !== CONFIGS.chainId) {
                await switchNetwork(ethereum);
                providerRef.current = new ethers.BrowserProvider(window.ethereum);
            }

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            setAccount(accounts[0]);
            initEvent();
        } catch (error) {
            console.log('Unable to connect wallet: ' + error.code)
        }
    }

    const getContract = async (address, abi) => {
        if (!providerRef.current) {
            return null;
        }

        const contract = new ethers.Contract(address, abi, providerRef.current);
        const signer = await providerRef.current.getSigner();
        return contract.connect(signer);
    }

    const initEvent = () => {
        window.ethereum.on('chainChanged', (_) => window.location.reload())
        window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0]);
        })
    }

    useEffect(() => {
        initWallet();
    }, []);

    return {
        account,
        getContract,
        connectWallet
    }
}