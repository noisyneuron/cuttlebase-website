import { Layout } from '../layout'
import { Helmet } from 'react-helmet-async'
import { DevelopmentPage } from '../components/DevelopmentPage'
import content from '../data/content.json'

export default function Development() {
  return (
    <Layout theme='dark' pageClass='developmentpage-wrapper'>
      <Helmet>
        <title> Embryonic Development | Cuttlebase </title>
      </Helmet>
      <DevelopmentPage content={content.development} citation={content.global.citation} />
    </Layout>
  )
}