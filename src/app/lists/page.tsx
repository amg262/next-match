import React from 'react'
import ListsTab from '@/app/lists/ListsTab'
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from '@/app/actions/likeActions'

export default async function ListsPage ({ searchParams }: {
  searchParams: { type: string }
}) {
  const likeIds = await fetchCurrentUserLikeIds()
  const members = await fetchLikedMembers(searchParams.type)
  return (
    <div><ListsTab members={members} likedIds={likeIds}/></div>
  )
}