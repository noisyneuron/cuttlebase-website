import { Layout } from '../layout'
import { Helmet } from 'react-helmet-async'
import { AtlasPage } from '../components/AtlasPage'
import { MenuProvider } from '../util/MenuProvider'

export default function Brain() {
  return (
    <Layout theme='dark' pageClass='atlas-wrapper' fixed={true}>
      <Helmet>
        <title> 3D Brain &amp; Histology | Cuttlebase </title>
      </Helmet>
      <MenuProvider page='brain'>
        <AtlasPage isBrain={true}/>
      </MenuProvider>
    </Layout>
  )
}