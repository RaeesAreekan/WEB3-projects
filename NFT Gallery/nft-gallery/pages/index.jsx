import Head from "next/head";
import Image from "next/image";
import { use, useState } from "react";
import { NFTCard } from "./components/NFTcard";

const Home = () => {
  const [walet, setwalletaddress] = useState("");
  const [collection, setcollectionaddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  let nfts;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const fetchNFTs = async () => {
    const apikey = "6WhsndIIJkkQFgBBypj-54tCqeB6df8L";
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apikey}/getNFTs/`;
    console.log("fetching nfts");
    if (!collection.length) {
      // Replace with the wallet address you want to query:
      //owner address is stored in walet
      const fetchURL = `${baseURL}?owner=${walet}`; //fetch all the nfts owned by this walet;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json()); //converting string data to json data
    } else {
      console.log("Fetching NFTs in the collection for this owner");
      const fetchURL = `${baseURL}?owner=${walet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }
    if (nfts) {
      console.log("here are the nfts", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };
  const FetchNFTsForCollection = async () => {
    if (collection.length) {
      const apikey = "6WhsndIIJkkQFgBBypj-54tCqeB6df8L";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apikey}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }
    if (nfts) {
      console.log("NFTs in this particular collection are/is", nfts);
      setNFTs(nfts.nfts);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input
          onChange={(e) => {
            setwalletaddress(e.target.value);
          }}
          value={walet}
          type={"text"}
          placeholder="Enter your Walet Address"
        ></input>
        <input
          onChange={(e) => {
            setcollectionaddress(e.target.value);
          }}
          value={collection}
          type={"text"}
          placeholder="Add Collection Address"
        ></input>
        <label>
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
            type={"checkbox"}
          ></input>
          TICK IF YOU WANT COLLECTION ONLY
        </label>
        <button
          onClick={() => {
            if (fetchForCollection) {
              FetchNFTsForCollection();
            } else {
              fetchNFTs();
            }
          }}
        >
          CLICK HERE !!!!!!!
        </button>
      </div>
      <div>
        {NFTs.length &&
          NFTs.map((nfts) => {
            return <NFTCard nfts={nfts}></NFTCard>;
          })}
      </div>
    </div>
  );
};
export default Home;
