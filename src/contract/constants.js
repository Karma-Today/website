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
        address: '0x34fB51435E3964798b1c9007127A1D4c7a5FBBD0',
        abi: [
            "function totalSupply() view returns (uint256)",
            "function balanceOf(address account) view returns (uint256)",
            "function getCurrentProcess() view returns (uint256)",
            "function getPublicShareAmount() view returns (uint256)",
            "function mint(uint256 usdtAmount, address to)",
            "event Mint(uint256 indexed seq, address indexed from, address indexed to, uint256 donationUSD, uint256 mintedAmount, uint256 process)"
        ]
    }
}