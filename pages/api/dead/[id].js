import { deadlarva } from '../../../data'
import Web3 from 'web3';
import { CC_ABI } from '../../../utils/global.data';
import { useEffect, useState } from 'react';


export default function personHandler({ query: { id } }, res) {

  // User with id exists

  const filtered = deadlarva.filter((p) => p.id === id)
  if (filtered.length > 0 && id ) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Larva with id: ${id} not found.` })
  }
}
