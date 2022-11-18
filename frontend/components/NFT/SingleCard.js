import React, { useEffect, useState, useRef } from 'react';
import Web3Modal from 'web3modal';
import { Contract, ethers, providers, utils } from 'ethers';

const SingleCard = (props) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const web3ModalRef = useRef();
  // const DOG_CONTRACT_ADDRESS = '0xe7bdE79Abc3C045A9b11E58f5d3617FB7E2DdacA';
  // const DOG_CONTRACT_ABI = [
  //   {
  //     inputs: [
  //       {
  //         internalType: 'string',
  //         name: '__metadataUri',
  //         type: 'string',
  //       },
  //       {
  //         internalType: 'address',
  //         name: 'treasury',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'nonpayable',
  //     type: 'constructor',
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'owner',
  //         type: 'address',
  //       },
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'approved',
  //         type: 'address',
  //       },
  //       {
  //         indexed: true,
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'Approval',
  //     type: 'event',
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'owner',
  //         type: 'address',
  //       },
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'operator',
  //         type: 'address',
  //       },
  //       {
  //         indexed: false,
  //         internalType: 'bool',
  //         name: 'approved',
  //         type: 'bool',
  //       },
  //     ],
  //     name: 'ApprovalForAll',
  //     type: 'event',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'to',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'approve',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'previousOwner',
  //         type: 'address',
  //       },
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'newOwner',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'OwnershipTransferred',
  //     type: 'event',
  //   },
  //   {
  //     inputs: [],
  //     name: 'publicMint',
  //     outputs: [],
  //     stateMutability: 'payable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'renounceOwnership',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'from',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'address',
  //         name: 'to',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'safeTransferFrom',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'from',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'address',
  //         name: 'to',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //       {
  //         internalType: 'bytes',
  //         name: 'data',
  //         type: 'bytes',
  //       },
  //     ],
  //     name: 'safeTransferFrom',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'operator',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'bool',
  //         name: 'approved',
  //         type: 'bool',
  //       },
  //     ],
  //     name: 'setApprovalForAll',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'bool',
  //         name: 'val',
  //         type: 'bool',
  //       },
  //     ],
  //     name: 'setPaused',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'from',
  //         type: 'address',
  //       },
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'to',
  //         type: 'address',
  //       },
  //       {
  //         indexed: true,
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'Transfer',
  //     type: 'event',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'from',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'address',
  //         name: 'to',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'transferFrom',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'newOwner',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'transferOwnership',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     stateMutability: 'payable',
  //     type: 'fallback',
  //   },
  //   {
  //     inputs: [],
  //     name: 'withdraw',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     stateMutability: 'payable',
  //     type: 'receive',
  //   },
  //   {
  //     inputs: [],
  //     name: '_baseTokenURI',
  //     outputs: [
  //       {
  //         internalType: 'string',
  //         name: '',
  //         type: 'string',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: '_paused',
  //     outputs: [
  //       {
  //         internalType: 'bool',
  //         name: '',
  //         type: 'bool',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: '_presaleMintPrice',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: '_publicMintPrice',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'owner',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'balanceOf',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'getApproved',
  //     outputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'owner',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'address',
  //         name: 'operator',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'isApprovedForAll',
  //     outputs: [
  //       {
  //         internalType: 'bool',
  //         name: '',
  //         type: 'bool',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'maxTokenIds',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'name',
  //     outputs: [
  //       {
  //         internalType: 'string',
  //         name: '',
  //         type: 'string',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'owner',
  //     outputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'ownerOf',
  //     outputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'bytes4',
  //         name: 'interfaceId',
  //         type: 'bytes4',
  //       },
  //     ],
  //     name: 'supportsInterface',
  //     outputs: [
  //       {
  //         internalType: 'bool',
  //         name: '',
  //         type: 'bool',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'symbol',
  //     outputs: [
  //       {
  //         internalType: 'string',
  //         name: '',
  //         type: 'string',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: 'index',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'tokenByIndex',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'tokenIds',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'owner',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: 'index',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'tokenOfOwnerByIndex',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: 'tokenId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'tokenURI',
  //     outputs: [
  //       {
  //         internalType: 'string',
  //         name: '',
  //         type: 'string',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'totalSupply',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  // ];
  const DOG_CONTRACT_ADDRESS = '0x96c88de4A4410BC09dEf9c5E82b4bF2106A09019';
  const DOG_CONTRACT_ABI = [
    {
      inputs: [
        {
          internalType: 'string',
          name: '__metadataUri',
          type: 'string',
        },
        {
          internalType: 'address',
          name: 'treasury',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      inputs: [],
      name: 'publicMint',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bool',
          name: 'val',
          type: 'bool',
        },
      ],
      name: 'setPaused',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
    {
      inputs: [],
      name: '_baseTokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: '_paused',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: '_presaleMintPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: '_publicMintPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'maxTokenIds',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'tokenIds',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  // Function to get the provider or signer. Take's true as param to get the signer.
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert('Change the network to Mumbai');
      throw new Error('Change network to Mumbai');
    }
    // if (chainId !== 5) {
    //   window.alert('Please change the network to goerli !');
    //   throw new Error('Please change the network to goerli !');
    // }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  //Function to get the dog dao contract instacne
  const getDogDaoContract = (providerOrSigner) => {
    return new Contract(
      DOG_CONTRACT_ADDRESS,
      DOG_CONTRACT_ABI,
      providerOrSigner
    );
  };

  const publicMint = async () => {
    try {
      const providerOrSigner = await getProviderOrSigner(true);
      const dogDaoContract = getDogDaoContract(providerOrSigner);
      const tx = await dogDaoContract.publicMint({
        value: utils.parseEther('0.01'),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You have minted 2 NFT's!!!🎉");
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 'mumbai',
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);
  return (
    <div className=" w-64 bg-white bg-opacity-10">
      <img
        src={`/dog-images/${props.id}.png`}
        className="w-full h-64 object-cover"
        alt="dog image"
      />
      <div className="mt-4 pb-4">
        <div className="px-6 flex justify-between">
          <p>Dog</p>
          <div>
            <p className="flex justify-center gap-2 items-center">
              <img src="/dog-images/icon-ethereum.svg" alt="" />
              <span>{props.price}</span>
            </p>
            <p>Floor price</p>
          </div>
        </div>
        <div className="px-4 mt-8">
          <button
            className="px-4 py-2 bg-primaryGradientOne hover:bg-violet-500 w-full transition-colors"
            onClick={publicMint}
          >
            {props.title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
