const hre = require("hardhat");
async function getbalace(address){
  const balancebigint=await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balancebigint);
}
async function printbalances(addresses){
  let i=0;
  for(const address of addresses){
    console.log(`address ${i} balance:`,await getbalace(address));
    i++;
  }}
  async function printmemos(memos){
    for(const memo of memos){
      const timestamp=memo.timestamp;
      const tipper=memo.name;
      const tipperaddress=memo.from;
      const message=memo.message;
      console.log(`At ${timestamp},${tipper} with address ${tipperaddress} said : ${message}`);
    }


  }
  async function main(){
    //getting random address
    const [owner,tipper1,tipper2,tipper3]= await hre.ethers.getSigners();
    //deploying the contract
    const Buymecoffee= await hre.ethers.getContractFactory("Buymecoffee");
    const buymecoffee=await Buymecoffee.deploy();
    await buymecoffee.deployed();
    
    //waiting for contract deployment
    
    console.log("Buymecoffee contract deployed to:",buymecoffee.address);
    const addresses=[owner.address, tipper1.address,buymecoffee.address];
    console.log("== start ==");
    await printbalances(addresses);
    const tip={value:hre.ethers.utils.parseEther("1")};
    await buymecoffee.connect(tipper1).buycoffee("samu","nee mwuthada",tip);
    await buymecoffee.connect(tipper2).buycoffee("ramu","nee mwuthumaniyada",tip);
    await buymecoffee.connect(tipper3).buycoffee("damu","nee mass ada",tip);
    //check balance
    console.log("==bought coffee");
    await printbalances(addresses);
    //withdraw tips
    await buymecoffee.connect(owner).withdraw();
    //print balance
    console.log("==after withdrawal");
    await printbalances(addresses);
    //printing memos
    console.log("==memo==");
    const mem = await buymecoffee.getmemoes();
    printmemos(mem);
    

  }

  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });