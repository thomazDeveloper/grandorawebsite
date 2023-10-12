const Contracts = {
    NFT: {
        address: '0x3A31153Ee199205A8b246eF6fF597Ca97EC5D2d5',
        abi: require("../abis/nft.json")
    },
    multicall: {
        address: '0x7B18483975F54e7f322f35445d483B23Dbae6704',
        abi: require('../abis/multicall.json')
    },
    stake: {
        address: '0x74f63F379A25cb5dD780C525C23Dbb92C1a4C641',
        abi: require("../abis/stake.json")
    },
    bep: {
        address: "0x47f8F0A4bdBaEF9F0B5b8e2Ddd9C55A3A3a89899",
        abi: require("../abis/bep.json")
    },
    erc: {
        address: "0x6397aF865B5B32986aAC1376DcFeB171B691c5fa",
        abi: require("../abis/erc.json")
    }
}

export default Contracts;