export const CONFIGS = {
    provider: 'https://eth-mainnet.g.alchemy.com/v2/veXE1VwBa3NqsH673T2NT0mm2nCT7NM4',
    mainnet: true,
    walletConnectProjectId: '96e543b53dd2885d4ce06991df657b10',
    usdt: {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 6,
        abi: [
            "function allowance(address owner, address spender) view returns (uint256)",
            "function approve(address spender, uint256 value) returns (bool)"
        ]
    },
    karma: {
        address: '0x0be36762573dF13AD18EB01ebC7b278f1338a171',
        abi: [
            "function totalSupply() view returns (uint256)",
            "function balanceOf(address account) view returns (uint256)",
            "function getCurrentProcess() view returns (uint256)",
            "function getPublicShareAmount() view returns (uint256)",
            "function totalDonated() view returns (uint256)",
            "function seq() view returns (uint256)",
            "function donate(uint256 usdtAmount, address to)",
            "event Donate(uint256 indexed seq, address indexed from, address indexed to, uint256 donationUSD, uint256 mintedAmount, uint256 process)"
        ]
    }
}