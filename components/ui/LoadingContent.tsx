import React from 'react'
import Loader from './Loader'

const LoadingContent = ({
  message,
}: {
  message?: string
}) => {
  return (
    <div className="screen-height flex justify-center items-start py-10">
      <div className="flex justify-center flex-col gap-1 items-center">
        <Loader />
        <p className="text-xl md:text-3xl max-w-[600px] text-center tracking-widest font-light">
          {message}
        </p>
      </div>
    </div>
  )
}

export default LoadingContent
