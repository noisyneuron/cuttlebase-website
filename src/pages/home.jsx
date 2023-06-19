import { Layout } from '../layout'
import { Helmet } from 'react-helmet-async'
import { Homepage } from '../components/Homepage'
import content from '../data/content.json'

export default function Home() {
  return (
    <Layout theme='light' pageClass='homepage-wrapper'>
      <Helmet>
        <title> Cuttlebase </title>
      </Helmet>
      <Homepage content={content.homepage}/>
    </Layout>
  )
}