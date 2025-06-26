export const CONFIGS = {
    provider: 'https://sepolia.infura.io/v3/9528e81fcbc54f12acd36b08204e4f2d',
    chainId: 11155111,
    usdt: {
        address: '0x430089ED6ed4CAf11f21A66dbdDB1247931Bd8e1',
        decimals: 6,
        abi: [
            "function allowance(address owner, address spender) view returns (uint256)",
            "function approve(address spender, uint256 value) returns (bool)"
        ]
    },
    karma: {
        address: '0x813052E32990165CabB7b3A56cdc9789C2357021',
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