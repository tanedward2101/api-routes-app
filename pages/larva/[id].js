import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import Web3 from 'web3'

import { CC_ABI } from '../../utils/global.data'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Larva() {

  const provider = `https://rinkeby.infura.io/v3/10475d80c3ba4b3d8f768b09dd3faafc`;
  const [supply, setSupply] = useState(0);
  const web3 = new Web3(
    new Web3.providers.HttpProvider(provider),
  );
  useEffect(() => {
    getSupply();
  }, [])

  async function getSupply() {
    const contract = new web3.eth.Contract(
      CC_ABI,
      '0xA7f5BEd28c596afEc2980C29874963A974461Cf1',
    )
    const amount = await contract.methods.totalSupply().call()
    setSupply(amount);

  }


  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.id && `/api/dead/${query.id}`,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div></div>
    return (JSON.stringify(data))
  
}
