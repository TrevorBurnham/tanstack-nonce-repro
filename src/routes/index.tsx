import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: () => ({ message: 'loader data' }),
  component: Home,
})

function Home() {
  const { message } = Route.useLoaderData()
  const [hydrated, setHydrated] = useState(false)
  const [count, setCount] = useState(0)
  useEffect(() => setHydrated(true), [])
  return (
    <main>
      <p>{message}</p>
      <p id="status">{hydrated ? 'hydrated' : 'not hydrated'}</p>
      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
    </main>
  )
}
