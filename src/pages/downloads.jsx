import { Layout } from '../layout'
import { Helmet } from 'react-helmet-async'
import { DownloadsPage } from '../components/DownloadsPage'
import content from '../data/content.json'

export default function Downloads() {
  return (
    <>
      <Layout theme='light' pageClass='downloadspage-wrapper'>
        <Helmet>
        <title> Downloads | Cuttlebase </title>
      </Helmet>
        <DownloadsPage content={content.downloads}/>
      </Layout>
    </>
  )
}