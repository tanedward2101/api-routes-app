import { deadlarva } from '../../../data'
import Web3 from 'web3';
import { CC_ABI } from '../../../utils/global.data';
import { useEffect, useState } from 'react';


export default function personHandler({ query: { id } }, res) {

  // User with id exists 
   const provider = `https://mainnet.infura.io/v3/10475d80c3ba4b3d8f768b09dd3faafc`;

  const web3 = new Web3(
    new Web3.providers.HttpProvider(provider),
  );

getSupply()
  async function getSupply() {
    const contract = new web3.eth.Contract(
      CC_ABI,
      '0xC3c95CCbed978Fd2915ffa1883f5EDe2590512E7',
    )
    const amount = await contract.methods.totalSupply().call()
    
    const filtered = deadlarva.filter((p) => p.name === "Deadlarvaz # "+id)
    if (filtered.length > 0 && id < amount) {
      res.status(200).json(filtered[0])
    } else {
      res.status(404).json({ message: `Larva with id: ${id} not found.` })
    }

  }



}
