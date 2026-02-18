import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const postCar = (car) => {
        axios.post("https://63ac4406da81ba97617f073c.mockapi.io/devices",
            {
                title: car.title,
                description: car.description,
                created_at: car.created_at
            })
    }

    // Mutations
    const mutation = useMutation({
        mutationFn: postCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devices'] })
            navigate('/posts')
        },
        onError: (error) => {
            console.log('Error', error)
        }
    })

    return (
        <div>
            <form action="" className='flex flex-col gap-2 '>

                <input type="text" className='border-1 border-black p-2' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" className='border-1 border-black p-2' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />


                <button type='submit' className='text-white' onClick={(e) => {
                    e.preventDefault(),
                        mutation.mutate({
                            title: title,
                            description: description,
                            created_at: new Date().toISOString()
                        })
                }}>Create</button>

            </form>
        </div>
    )
}

export default CreatePost