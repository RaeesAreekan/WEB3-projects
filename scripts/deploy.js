const main=async()=>{
    try{
            const nftcontractfactory=await hre.ethers.getContractFactory("chainbattle");
            const nftcontract=await nftcontractfactory.deploy();
            await nftcontract.deployed();
            console.log("contrat deployed to",nftcontract.address);
            process.exit(0);


            }
            catch(error)
            {
                console.log(error);
                process.exit(1);


            }
};
main();
