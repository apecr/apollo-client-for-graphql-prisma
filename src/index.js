/* global document*/
import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

const getUsers = gql`
    query{
        users{
            id
            name
        }
    }
`

const getPosts = gql`
    query{
        posts{
            id
            title
            author{
                name
            }
        }
    }

`

client.query({
  query: getUsers
}).then(response => {
  let html = ''
  response.data.users.forEach(user => {
    html += `
        <div>
            <h3>${user.name}</h3>
        </div>
      `
  })
  document.getElementById('users').innerHTML = html
})

client.query({
  query: getPosts
}).then(response => {
  document.getElementById('posts').innerHTML = response.data.posts.reduce((acc, post) => {
    return acc += `
        <div>
            <h3>${post.title}</h3>
            <h4>${post.author.name}</h4>
        </div>
      `
  }, '')

})