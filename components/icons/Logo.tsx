import React from 'react'

const Logo = ({ css, size="md" }: { css?: string, size?: "sm"|"md"|"lg" }) => {
  const sz = {
    sm:'h-[15px] w-[40.5px] lg:h-[20px] lg:w-[54px]',
    md: 'h-[20px] w-[54px] lg:h-[30px] lg:w-[80px]',
    lg:'h-[30px] w-[80px] lg:h-[40px] lg:w-[105px]',
  }
  return (
    <div className="rounded-md hover:bg-offwhite transition-all p-2 border">
      <svg
        viewBox="0 0 254 97"
        className={`${css ? css : ''} ${sz[size]} h-fit stroke-red-500 fill-red-500`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 10C0 4.47715 4.47715 0 10 0H244C249.523 0 254 4.47715 254 10V87C254 92.5228 249.523 97 244 97H10C4.47715 97 0 92.5228 0 87V10Z"
          fill="url(#pattern0_3_5)"
        />
        <defs>
          <pattern
            id="pattern0_3_5"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              href="#image0_3_5"
              transform="matrix(0.00255304 0 0 0.00639082 -0.0748031 -0.185567)"
            />
          </pattern>
          <image
            id="image0_3_5"
            width="458"
            height="221"
            href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </div>
  )
}

export default Logo
