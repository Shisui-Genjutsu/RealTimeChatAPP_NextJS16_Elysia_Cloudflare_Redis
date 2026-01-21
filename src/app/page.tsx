'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from "react-hook-form"
import { nanoid } from "nanoid"
import { useMutation } from '@tanstack/react-query'
import { client } from '@/lib/client'

type Inputs = {
	name: string
}

const ANIMALS = ['wolf', 'jaguar', 'bear']
const STORAGE_KEY = "chat_username"

const generatedUsername = () => {
	const word = ANIMALS?.[Math.random() * ANIMALS.length]
	return `anonymus-${word}-${nanoid(5)}`
}

const Page = () => {
	const [userName, setUserName] = useState("")

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		localStorage.setItem(STORAGE_KEY, data.name)
		setUserName(data.name)
		console.log(data)
	}

	useEffect(() => {
		const main = () => {
			const stored = localStorage.getItem(STORAGE_KEY)
			if (stored) {
				setUserName(stored)
				setValue("name", stored)
				return;
			}

			const genarated = generatedUsername()
			localStorage.setItem(STORAGE_KEY, genarated)
			setUserName(genarated)
			setValue("name", genarated)
		}

		main()
	}, [setValue])


	const { mutate: createRoom } = useMutation({
		mutationFn: async () => {
			const res = await client.rooms.create.post()
		}
	})
	return (
		<div className='p-4 min-h-[calc(100dvh-4.5rem)] grid place-items-center'>
			<div className='flex flex-col gap-2 max-w-md w-full'>
				<h3 className='font-bold text-2xl text-center text-green-500'>Private Chat</h3>
				<p className='text-zinc-500 text-sm text-center'>A private, self-destructing chat room</p>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 max-w-md w-full border border-zinc-800 p-5 rounded-md bg-zinc-900/50 backdrop-blur-md'>
					<p className='font-semibold text-xl text-zinc-500'>Your Identity</p>
					<input {...register("name", { required: true })} className='font-lexend-deca text-zinc-400 font-medium border border-zinc-800 p-2 rounded-lg' />
					<Button onClick={() => createRoom()} className='font-bold text-base'>Create Secure Room</Button>

					{errors.name && <p className='text-red-500'>Name is required</p>}
				</form>
			</div>
		</div>
	)
}

export default Page