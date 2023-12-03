import { useEffect, useState } from 'react'
import tesloApi from '../../../api'

export const RequesInfo = () => {
  const [info, setInfo] = useState<unknown>()

  useEffect(() => {
    tesloApi
      .get('/auth/private')
      .then((resp) => setInfo(resp.data))
      .catch(() => setInfo('Error'))
  }, [])

  return (
    <>
      <h2>Información</h2>

      <pre>
        <code>{JSON.stringify(info, null, 2)}</code>
      </pre>
    </>
  )
}
