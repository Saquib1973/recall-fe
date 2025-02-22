import React from 'react'

const Loader = () => {
  const arr = new Array(4).fill(0)
  return (
      <div className="bg-black-3 dark:bg-black-2 rounded-full p-3 inline-block">
        <div className="grid grid-cols-2 gap-1 md:gap-1.5 animate-spin">
          {arr.map((item, index) => (
            <div key={index} className="size-1.5 rounded-full bg-white-1.5 dark:bg-white-2" />
          ))}
      </div>

    </div>
  )
}

export default Loader
