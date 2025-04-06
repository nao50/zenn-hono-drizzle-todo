import { hc } from 'hono/client'
import type { AppType } from './index.js'

const client = hc<AppType>('http://localhost:3003')

// const postRes = await client.todo.$post({
//   json: {
//     todo: 'test todo 01',
//   },
// })
// const postData = await postRes.json()
// console.log(`${postData}`)

const fetchApi = async () => {

  const getRes = await client.todo.$get({})
  const getData = await getRes.json()

  return getData
}

fetchApi()
  .then((data) => {
    for(const todo of data) {
      console.log(`ID: ${todo.id}, Todo: ${todo.todo}`)
    }
  })
  .catch((error) => {
    console.error(`Error fetching data: ${error}`)
  });  