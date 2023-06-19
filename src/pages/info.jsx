import { Layout } from '../layout'
import { Helmet } from 'react-helmet-async'
import { InfoPage } from '../components/InfoPage'
import content from '../data/content.json'

export default function Info() {
  return (
    <Layout theme='light' pageClass='infopage-wrapper'>
      <Helmet>
        <title> Info | Cuttlebase </title>
      </Helmet>
      <InfoPage content={content.info} citation={content.global.citation} />
    </Layout>
  )
}