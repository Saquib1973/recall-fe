'use client'
import InfiniteScrollContent from '@/components/ui/InfiniteScrollComponent';
import { useContent } from '@/store/Store';
import { useEffect } from 'react';

const page = () => {
  let { content, loading, error, getContent, getChunks } = useContent();
  useEffect(() => {


    getChunks()
  }, [getChunks])

  console.log(content);

  return (
    <div className="p-10 w-full">
      <div>
        <InfiniteScrollContent />
        {/* {content.map((item, index) => (<>{JSON.stringify(item)}</>))} */}
      </div>
      <button className='border p-2'>Bring Data</button>
    </div>
  )
}

export default page

