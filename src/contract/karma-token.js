// src/services/contractService.js
import { ethers } from 'ethers';
import { CONFIGS } from './constants';

//const provider = new ethers.JsonRpcProvider(`https://base-mainnet.infura.io/v3/9528e81fcbc54f12acd36b08204e4f2d`);
const provider = new ethers.JsonRpcProvider(CONFIGS.provider);

// Contract address
//export const KARMA_TOKEN = '0x3971deB79AC2F42CBDA9c8b34C094040EDa8382B';

// Create karma token instance
const { address, abi } = CONFIGS.karma;
export const karmaToken = new ethers.Contract(address, abi, provider);

export async function getCurrentProcess() {
    const process = await karmaToken.getCurrentProcess();
    return process;
}

export async function queryMintEvents(fromBlock = 8612910, toBlock = 'latest') {
    try {
        // Use the same provider 
        const eventProvider = provider; 

        // Query mint events
        const filter = karmaToken.filters.Mint();
        const events = await karmaToken.queryFilter(filter, fromBlock, toBlock);

        return await Promise.all(events.map(async (event) => {
            // Fallback timestamp
            let timestamp = Math.floor(Date.now() / 1000); 
            try {
                if (event.blockNumber) {
                    const block = await eventProvider.getBlock(event.blockNumber);
                    if (block && block.timestamp) {
                        timestamp = block.timestamp;
                    }
                }
            } catch (error) {
                console.error(`Failed to fetch block ${event.blockNumber} for event ${event.transactionHash}:`, error);
            }
            // Map events to more readable format
            return {
                seq: Number(event.args[0]),
                from: event.args[1],
                to: event.args[2],
                donationUSD: Number(event.args[3]),
                mintedAmount: ethers.formatEther(event.args[4]),
                process: Number(event.args[5]),
                timestamp, // UNIX timestamp (in seconds)
                formattedTime: new Date(timestamp * 1000).toLocaleDateString()
            };
        }));
    } catch (error) {
        console.error('Error querying mint events:', error);
        throw error;
    }
}

export async function getPublicShareAmount() {
    const amount = await karmaToken.getPublicShareAmount();
    return amount;
}