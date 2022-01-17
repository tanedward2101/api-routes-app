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



  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.id && `/api/dead/${query.id}`,
    fetcher
  )

  if (error) return <div>{error.message}</div>
   if (!data) return <div>Loading...</div>
  if (query.id > supply) {
    return (<div></div>)
  }
  else {
    return (JSON.stringify(data))
  }
}
