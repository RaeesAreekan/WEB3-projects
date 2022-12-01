const hre =require("hardhat");
async function main(){
    const Buymecoffee= await hre.ethers.getContractFactory("Buymecoffee");
    const buymecoffee=await Buymecoffee.deploy();
    await buymecoffee.deployed();
    console.log("Buymecoffee deployed to:".buymecoffee.address);

}
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});