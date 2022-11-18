import BenefitList from '../components/BenefitList';
import { Contract, providers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Web3Modal from 'web3modal';
import {
  DAO_CONTRACT_ADDRESS,
  DAO_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
} from '../constants';

const DaoPage = () => {
  const [treasuryBalance, setTreasuryBalance] = useState('0');
  const [numProposals, setNumProposals] = useState('0');
  const [proposals, setProposals] = useState([]);
  const [nftBalance, setNftBalance] = useState(0);
  const [ngoAddress, setNgoAddress] = useState('');
  const [amountToBeSent, setAmountToBeSent] = useState(0);
  const [selectedTab, setSelectedTab] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const web3ModalRef = useRef();

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

  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner();
      const daoContract = getDaoContractInstance(provider);
      const _owner = await daoContract.owner();
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
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

  const getCryptodevsNFTContractInstance = (providerOrSigner) => {
    return new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      providerOrSigner
    );
  };

  const getDaoContractInstance = (providersOrSigner) => {
    return new Contract(
      DAO_CONTRACT_ADDRESS,
      DAO_CONTRACT_ABI,
      providersOrSigner
    );
  };

  const getUserNFTBalance = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = getCryptodevsNFTContractInstance(signer);
      const balance = await nftContract.balanceOf(signer.getAddress());
      setNftBalance(parseInt(balance.toString()));
    } catch (err) {
      console.error(err);
    }
  };

  const getDAOTreasuryBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const balance = await provider.getBalance(DAO_CONTRACT_ADDRESS);
      setTreasuryBalance(balance.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const getNumProposalsInDAO = async () => {
    const provider = await getProviderOrSigner();
    const contract = getDaoContractInstance(provider);
    const daoNumProposals = await contract.numProposals();
    setNumProposals(daoNumProposals.toString());
  };

  const fetchAllProposals = async () => {
    try {
      const proposals = [];
      for (let i = 0; i < numProposals; i++) {
        const proposal = await fetchProposalByID(i);
        proposals.push(proposal);
      }
      setProposals(proposals);
      console.log(proposals);
      return proposals;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProposalByID = async (id) => {
    try {
      const provider = await getProviderOrSigner();
      const daoContract = getDaoContractInstance(provider);
      const proposal = await daoContract.proposals(id);
      const parsedProposal = {
        proposalId: id,
        ngoAddress: proposal.ngoAddress.toString(),
        amountToBeSent: proposal.amountToBeSent.toString(),
        deadline: new Date(parseInt(proposal.deadline.toString()) * 1000),
        yayVotes: proposal.yayVotes.toString(),
        nayVotes: proposal.nayVotes.toString(),
        executed: proposal.executed,
      };
      co;
      return parsedProposal;
    } catch (err) {
      console.error(err);
    }
  };

  const createProposal = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const daoContract = getDaoContractInstance(signer);
      const tx = await daoContract.createProposal(ngoAddress, amountToBeSent);
      setLoading(true);
      await tx.wait();
      await getNumProposalsInDAO();
      setLoading(false);
    } catch (err) {
      console.error(err);
      // window.alert(err.data.message);
    }
  };

  const voteOnProposal = async (proposalId, _vote) => {
    try {
      const signer = getProviderOrSigner(true);
      const daoContract = getDaoContractInstance(signer);
      let vote = _vote === 'YAY' ? 0 : 1;
      const tx = await daoContract.voteOnProposal(proposalId, vote);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await fetchAllProposals();
    } catch (err) {
      console.error(err);
      window.alert(err.data.message);
    }
  };

  const executeProposal = async (proposalId) => {
    try {
      const signer = await getProviderOrSigner(true);
      const daoContract = getDaoContractInstance(signer);
      const tx = await daoContract.executeProposal(proposalId);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await fetchAllProposals();
    } catch (err) {
      console.error(err);
      window.alert(err.data.message);
    }
  };

  const renderButton = () => {
    return (
      <div className="flex items-center justify-center">
        <button
          className="font-bold bg-slate-200 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform mr-2"
          onClick={() => setSelectedTab('Create Proposals')}
        >
          Create Proposal
        </button>
        {/* <button
          className="font-bold bg-slate-200 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform ml-2"
          onClick={() => setSelectedTab('View Proposals')}
        >
          View Proposal
        </button> */}
      </div>
    );
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 'mumbai',
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet().then(() => {
        getDAOTreasuryBalance();
        getUserNFTBalance();
        getNumProposalsInDAO();
        getOwner();
      });
    }
  }, [walletConnected]);

  useEffect(() => {
    if (selectedTab === 'View Proposals') {
      fetchAllProposals();
      console.log(proposals);
    }
  }, [selectedTab]);

  function renderTabs() {
    if (selectedTab === 'Create Proposals') {
      return renderCreateProposalTab();
    } else if (selectedTab === 'View Proposals') {
      return renderViewProposalsTab();
    }
  }

  function renderCreateProposalTab() {
    if (loading) {
      return (
        <div className="text-xl">Loading.... Please wait for transaction.</div>
      );
    } else if (nftBalance === 0) {
      return (
        <div className="text-xl">
          {' '}
          You don't own any Pawsitive NFTs. <br />
          <b>You cannot create or vote on proposals.</b>
        </div>
      );
    } else {
      return (
        <div className="p-8">
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex flex-col">
              <label>Adress of NGO: </label>
              <input
                className="border-none px-3 py-1 outline-none rounded-md text-black"
                placeholder="0x000000..."
                type="text"
                onChange={(e) => setNgoAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Amount of Ether: </label>
              <input
                className=" border-none outline-none px-3 py-1 rounded-sm text-black "
                placeholder="0"
                type="number"
                onChange={(e) => setAmountToBeSent(e.target.value)}
              />
            </div>
          </div>

          <button
            className="font-bold bg-green-300 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform"
            onClick={createProposal}
          >
            Submit Proposal
          </button>
        </div>
      );
    }
  }

  function renderViewProposalsTab() {
    if (loading) {
      return (
        <div className="text-xl">Loading... Please wait for transaction.</div>
      );
    } else if (proposals.length === 0) {
      return <div className="text-xl">No Proposals have been created yet</div>;
    } else {
      return (
        <div>
          {proposals.map((p, index) => (
            <div
              key={index}
              className="flex-col flex-1 mt-1 border-white border-2 border-solid"
            >
              <p>Proposal ID: {p.proposalId}</p>
              <p>Fake NFT to Purchase: {p.nftTokenId}</p>
              <p>Deadline: {p.deadline.toLocaleString()}</p>
              {/* <p>Deadline: {p.deadline}</p> */}
              <p>Yay Votes: {p.yayVotes}</p>
              <p>Nay Votes: {p.nayVotes}</p>
              <p>Executed?: {p.executed.toString()}</p>
              {/* <p>Executed?: {p.executed}</p> */}
              {p.deadline.getTime() > Date.now() && !p.executed ? (
                <div className="flex items-center justify-center">
                  <button
                    className="font-bold bg-slate-200 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform"
                    onClick={() => voteOnProposal(p.proposalId, 'YAY')}
                  >
                    Vote YAY
                  </button>
                  <button
                    className="font-bold bg-slate-200 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform"
                    onClick={() => voteOnProposal(p.proposalId, 'NAY')}
                  >
                    Vote NAY
                  </button>
                </div>
              ) : p.deadline.getTime() < Date.now() && !p.executed ? (
                <div className="flex items-center justify-center">
                  <button
                    className="font-bold bg-slate-200 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform"
                    onClick={() => executeProposal(p.proposalId)}
                  >
                    Execute Proposal{' '}
                    {p.yayVotes > p.nayVotes ? '(YAY)' : '(NAY)'}
                  </button>
                </div>
              ) : (
                <div className="text-xl">Proposal Executed</div>
              )}
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <main className=" mt-10">
      <section className="text-center mb-16">
        <div className=" max-w-3xl mx-auto mt-24">
          <h2 className="font-bold text-3xl mb-8">
            Join the Dao to help animals charity
          </h2>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            rerum officia perferendis illo odit minima est amet aperiam
            consequatur error.
          </p>
        </div>
        <div className="mt-10">
          {/* <button className="font-bold bg-slate-200 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform">
            Join our Dao
          </button>
          <button className="font-bold bg-slate-200 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform ml-4">
            View Proposal
          </button> */}
          {renderButton()}

          {renderTabs()}
        </div>
      </section>
      {/* <section className='flex items-center justify-center flex-col mt-24'>
        <h2 className=' font-bold text-3xl'>Benefits of Joining the Dao</h2>
        <div className='my-10'>
          <ul>
            <BenefitList />
            <BenefitList />
            <BenefitList />
          </ul>
        </div>
      </section> */}
    </main>
  );
};

export default DaoPage;
