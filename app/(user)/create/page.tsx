'use client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import { useContent } from '@/store/Store'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import type { FormData } from '.'
import {motion} from 'framer-motion'


const CreateLink = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    link: '',
    description: '',
    tags: [],
  })
  const { createContent, loading } = useContent();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    console.log(name, value)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim())
    console.log(tags)
    setFormData((prev) => ({
      ...prev,
      tags: tags.filter((tag) => tag !== ''),
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createContent(formData)
      setFormData({
        title: '',
        link: '',
        description: '',
        tags: [],
      })
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating content:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-6 px-10 max-md:px-4"
    >
      <div className="p-6  max-w-5xl flex flex-col w-full">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10">Your Recall</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Title"
            type="text"
            className="p-2 w-full border rounded-lg"
          />

          <Input
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Enter link"
            type="url"
            className="p-2 w-full border rounded-lg"
          />

          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            type="textarea"
            className="p-2 w-full border rounded-lg"
            rows={4}
          />
          <Input
            name="tags"
            value={formData.tags?.join(', ') || ''}
            onChange={handleTagsChange}
            placeholder="Enter tags (e.g., tag1, tag2, tag3)"
            type="text"
            className="p-2 w-full border rounded-lg"
          />

          <Button variant="secondary" text="Submit" css="" type="submit" />
        </form>
      </div>
    </motion.div>
  )
}

export default CreateLink
