import { Layout } from '../layout'
import { Helmet } from 'react-helmet-async'
import { TeamPage } from '../components/TeamPage'
import content from '../data/content.json'

export default function Team() {
  return (
    <Layout theme='light' pageClass='teampage-wrapper'>
      <Helmet>
        <title> Team | Cuttlebase </title>
      </Helmet>
      <TeamPage content={content.team} />
    </Layout>
  )
}