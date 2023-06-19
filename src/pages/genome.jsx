import { Layout } from '../layout'
import { Helmet } from 'react-helmet-async'
import { GenomePage } from '../components/GenomePage'
import content from '../data/content.json'

export default function Genome() {
  return (
    <Layout theme='light' pageClass='genomepage-wrapper'>
      <Helmet>
        <title> Genome &amp; Transcriptome | Cuttlebase </title>
      </Helmet>
      <GenomePage content={content.genome}/>
    </Layout>
  )
}