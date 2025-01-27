import React from 'react'

const Loader = () => {
  const arr = new Array(4).fill(0)
  return (
      <div className="bg-offblack rounded-full p-3">
        <div className="grid grid-cols-2 gap-1 md:gap-1.5 animate-spin">
          {arr.map((item, index) => (
            <div key={index} className="size-1.5 rounded-full bg-white" />
          ))}
      </div>

    </div>
  )
}

export default Loader
