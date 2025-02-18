'use client'
import Alert from '@/components/ui/Alert';
import InfiniteScrollContent from '@/components/ui/InfiniteScrollComponent';
import { useContent } from '@/store/Store';
import { useEffect } from 'react';
import { useState } from 'react'


// const page = () => {
//   let { content, loading, error, getContent, getChunks } = useContent();
//   useEffect(() => {


//     getChunks()
//   }, [getChunks])

//   console.log(content);

//   return (
//     <div className="p-10 w-full">
//       <div>
//         <InfiniteScrollContent />
//         {/* {content.map((item, index) => (<>{JSON.stringify(item)}</>))} */}
//       </div>
//       <button className='border p-2'>Bring Data</button>
//     </div>
//   )
// }

const page = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-semibold">Page</h1>

      <button
        onClick={() => setShowAlert(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Show Alert
      </button>

      {showAlert && (
        <Alert
          message="This is a success message!"
          type="error"
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};


export default page

