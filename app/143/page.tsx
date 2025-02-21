'use client'
import Loader from '@/components/ui/Loader';
import DarkModeToggle from './../../components/ui/DarkModeToggle';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const Page = () => {
  return (
    <div className="flex flex-col bg-white-1 gap-4 min-h-screen dark:bg-black-1 dark:text-white p-10">
      <span>
        <Loader />
      </span>
      <DarkModeToggle />
      <div>
        <h1 className='text-5xl'>Colors</h1>
        <div className='flex flex-wrap gap-2'>
          <div className='w-10 h-10 bg-white-1'></div>
          <div className='w-10 h-10 bg-white-2'></div>
          <div className='w-10 h-10 bg-white-3'></div>
          <div className='w-10 h-10 bg-red-1'></div>
          <div className='w-10 h-10 bg-red-2'></div>
          <div className='w-10 h-10 bg-red-3'></div>
          <div className='w-10 h-10 bg-black-1'></div>
          <div className='w-10 h-10 bg-black-2'></div>
          <div className='w-10 h-10 bg-black-3'></div>
        </div>
      </div>
      <div>
        <h1 className='text-5xl'>Text</h1>
        <div className='flex flex-wrap gap-2'>
          <p className='text-2xl font-poiret'>This is Poiret Font Text</p>
          <p className='text-2xl font-mali'>This is Mali Font Text</p>
        </div>
      </div>
      <div className='flex flex-col mt-4 gap-2'>
        <h1 className='text-5xl'>Button</h1>
        <div className='flex flex-wrap gap-2'>
          <Button variant='primary' text='Primary Button' />
          <Button variant='secondary' text='Secondary Button' />
          <Button variant='tertiary' text='Tertiary Button' />
        </div>
      </div>
      <div className='flex flex-col mt-4 gap-2'>
        <h1 className='text-5xl'>Input</h1>
        <div className='flex flex-wrap gap-2'>
         <Input placeholder='Enter your name' />
        </div>
      </div>
    </div>
  );
};

export default Page

