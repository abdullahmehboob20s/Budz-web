# example_nft_minter
Use this repo to see how to create a Dapp that can mint NFTs.

First create pinata account.
After your account is created go and upload images and get the hash of the folder.
Go to your art-engine and run node utils/update_info.js after insert the hash of the baseurl to your project.
So now you have all .json metadata files with the right information.
Upload your .json files to pinata. With the metadata pointing to the image hash.
After upload all files into pinata.
Go to remix to deploy your smartcontract with the baseuri of the pinata files.
Go to your dapp and insert the hash of the contract created. At the folder blockchain in blockchainActions.js.
For Mainnet 1 for Rinkeby 4.
Update the smartcontract with the same contract that you deployed on Remix.
Also copy the byte code and save it for further access to info.

Learn how to withdraw funds. 
Transfer ownership.
All using the Remix interface.

To deploy your dapp on Heroku. 
Connect to Heroku and create the react-app directly.
npm install -g create-react-app
create-react-app my-app
cd my-app
git init
heroku create -b https://github.com/mars/create-react-app-buildpack.git
git add .
git commit -m "react-create-app on Heroku"
git push heroku master
heroku open

After that copy and paste your dapp project into the project created on heroku and commit and push it again.
You are ready for it.
Test on Rinkeby, after testing it you can change to Mainnet and also change the hash of the smartcontract into the blockchainAction.js so you will be able to mint it on the smartcontract in the Mainnet.

Important to understand that you point your metadata into the remix before deploy your contract.
The metadata will link the pinata account to opensea and display the image.