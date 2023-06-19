import { Layout } from '../layout'
import { Helmet } from 'react-helmet-async'
import { AtlasPage } from '../components/AtlasPage'
import { MenuProvider } from '../util/MenuProvider'

export default function Body() {
  return (
    <Layout theme='dark' pageClass='atlas-wrapper -body' fixed={true}>
      <Helmet>
        <title> 3D Cuttlefish | Cuttlebase </title>
      </Helmet>
      <MenuProvider page='body'>
        <AtlasPage isBrain={false}/>
      </MenuProvider>
    </Layout>
  )
}