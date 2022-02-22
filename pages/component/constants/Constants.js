export const busdTokenAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
export const tokenAbi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            }
        ],
        "name": "_mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "nameToken",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const contractBetAddress = "0xA475EAF67D84C2C7837ce5c0d028Bf2D543dd340";
export const contractBetAbi = [{ "inputs": [{ "internalType": "contract IERC20", "name": "_token", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "round", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "Claim", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "timeLock", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timeNow", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timeEnd", "type": "uint256" }], "name": "Time", "type": "event" }, { "inputs": [], "name": "ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }, { "internalType": "address", "name": "_address", "type": "address" }], "name": "claimReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint48", "name": "homeId", "type": "uint48" }, { "internalType": "uint48", "name": "awayId", "type": "uint48" }, { "internalType": "uint32", "name": "timeLockPrediction", "type": "uint32" }, { "internalType": "uint32", "name": "timeEndPrediction", "type": "uint32" }], "name": "createRound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }, { "internalType": "enum Bet.Position", "name": "position", "type": "uint8" }], "name": "endRoundByRoundId", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum Bet.Position", "name": "position", "type": "uint8" }], "name": "endRoundLatest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getRoundOnRun", "outputs": [{ "components": [{ "internalType": "enum Bet.Position", "name": "positionWin", "type": "uint8" }, { "internalType": "uint32", "name": "timeCreatePrediction", "type": "uint32" }, { "internalType": "uint32", "name": "timeLockPrediction", "type": "uint32" }, { "internalType": "uint32", "name": "timeEndPrediction", "type": "uint32" }, { "internalType": "uint48", "name": "homeId", "type": "uint48" }, { "internalType": "uint48", "name": "awayId", "type": "uint48" }, { "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "internalType": "uint256", "name": "amountHome", "type": "uint256" }, { "internalType": "uint256", "name": "amountAway", "type": "uint256" }, { "internalType": "uint256", "name": "amountDraw", "type": "uint256" }, { "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "internalType": "struct Bet.Round[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "getUserRound", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "predictionAway", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "predictionDraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "predictionHome", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "round", "outputs": [{ "internalType": "enum Bet.Position", "name": "positionWin", "type": "uint8" }, { "internalType": "uint32", "name": "timeCreatePrediction", "type": "uint32" }, { "internalType": "uint32", "name": "timeLockPrediction", "type": "uint32" }, { "internalType": "uint32", "name": "timeEndPrediction", "type": "uint32" }, { "internalType": "uint48", "name": "homeId", "type": "uint48" }, { "internalType": "uint48", "name": "awayId", "type": "uint48" }, { "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "internalType": "uint256", "name": "amountHome", "type": "uint256" }, { "internalType": "uint256", "name": "amountAway", "type": "uint256" }, { "internalType": "uint256", "name": "amountDraw", "type": "uint256" }, { "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userPrediction", "outputs": [{ "internalType": "bool", "name": "isClaimed", "type": "bool" }, { "internalType": "enum Bet.Position", "name": "positionPredict", "type": "uint8" }, { "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userRound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]

export const teams = new Map();
teams.set(1001, { name: "Arsenal", image: "https://upload.wikimedia.org/wikipedia/th/8/82/Arsenal_FC.png" });
teams.set(1002, { name: "Manchester City", image: "https://upload.wikimedia.org/wikipedia/th/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png" });
teams.set(1003, { name: "Liverpool", image: "https://upload.wikimedia.org/wikipedia/th/thumb/d/d1/Liverpool_FC_Logo.svg/1200px-Liverpool_FC_Logo.svg.png" });
teams.set(1004, { name: "Chelsea", image: "https://upload.wikimedia.org/wikipedia/th/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png" });
teams.set(1005, { name: "Manchester United", image: "https://lh3.googleusercontent.com/KNyKMfQqqVcLYAROYJ6KPW7nqmyMMcuc7npdzuzYI9KXhnZDJ3Wkfqy_apcQTDgq2QlNp9LzqQly06N5qsNxUOLT" });
teams.set(1006, { name: "West Ham United", image: "https://upload.wikimedia.org/wikipedia/th/c/c2/West_Ham_United_FC_logo.svg" });
teams.set(1007, { name: "Wolverhampton Wanderers", image: "https://upload.wikimedia.org/wikipedia/th/f/fc/Wolverhampton_Wanderers.svg" });
teams.set(1008, { name: "Tottenham Hotspur", image: "https://upload.wikimedia.org/wikipedia/th/6/6d/Tottenham_Hotspur.png" });
teams.set(1009, { name: "Brighton & Hove Albion", image: "https://upload.wikimedia.org/wikipedia/th/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/800px-Brighton_%26_Hove_Albion_logo.svg.png" });
teams.set(1010, { name: "Southampton", image: "https://upload.wikimedia.org/wikipedia/th/c/c9/FC_Southampton.svg" });
teams.set(1011, { name: "Leicester City", image: "https://upload.wikimedia.org/wikipedia/th/6/63/Leicester02.png" });
teams.set(1012, { name: "Aston Villa", image: "https://upload.wikimedia.org/wikipedia/th/thumb/5/57/Aston_Villa.png/150px-Aston_Villa.png" });
teams.set(1013, { name: "Crystal Palace", image: "https://upload.wikimedia.org/wikipedia/th/thumb/0/0c/Crystal_Palace_FC_logo.svg/170px-Crystal_Palace_FC_logo.svg.png" });
teams.set(1014, { name: "Brentford", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Brentford_FC_crest.svg/640px-Brentford_FC_crest.svg.png" });
teams.set(1015, { name: "Leeds United", image: "https://upload.wikimedia.org/wikipedia/th/5/54/Leeds_United_F.C._logo.svg" });
teams.set(1016, { name: "Everton", image: "https://upload.wikimedia.org/wikipedia/th/e/e4/Everton_F.C._2014.png" });
teams.set(1017, { name: "Newcastle United", image: "https://upload.wikimedia.org/wikipedia/th/f/f6/Newcastle_United_Logo.svg.png" });
teams.set(1018, { name: "Watford", image: "https://upload.wikimedia.org/wikipedia/th/e/e2/Watford.svg" });
teams.set(1019, { name: "Burnley", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Burnley_F.C._Logo.svg/1200px-Burnley_F.C._Logo.svg.png" });
teams.set(1020, { name: "Norwich City", image: "https://upload.wikimedia.org/wikipedia/th/4/41/Norwich_City.png" });