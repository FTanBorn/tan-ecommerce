// src/app/page.tsx
import HomeClient from '@/components/home/HomeClient'

import { getCategories } from './actions/getCategories'

export default async function Home() {
  const categories = await getCategories()

  return <HomeClient categories={categories} />
}
